# TypeORM

Exploring how to define TypeORM schemas (or relational ORM schemas in general) using JSON schema.

## Relationships

### Many to Many

See [Many to Many](./ManyToMany.md)

## Example:

```js
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Category } from "./Category";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "int" })
  value: number;

  @ManyToMany(type => Category, category => category.questions, {
    cascade: true
  })
  @JoinTable() // required/implicit for M-M
  categories: Category[];
}
```

## Many to Many

See [video](https://www.youtube.com/watch?v=RH_es0awU_A)

Create a simple join table between `Post` and `User` called `Vote`

```js
import User from './User'

class Post {

  @ManyToMany(()) => User)
  @JoinTable({name: 'Vote'})
  users: User[];
}
```

```js
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  name: "Question", // @Entity
  type: "object",
  typeorm: {
    decorators: {
      entity: true
    }
  },
  properties: {
    // @PrimaryGeneratedColumn()
    id: {
      type: "string",
      generated: true, // generated
      unique: true, // primary
      required: true
    },
    // @Column()
    title: {
      type: "string"
    },
    // @Column()
    value: {
      type: "integer"
    },
    // @ManyToMany(type => Category, category => category.questions, {cascade: true})
    categories: {
      type: "array",
      relationship: {
        kind: "ManyToMany",
        type: "Category", // which table to (Question.categories => Category)
        back: "questions", // property back to this table (Category.questions => Question)
        options: {
          cascade: true
        }
      }
    }
  }
};
```

We can also use JSON schema directly, by use of `$ref` and definitions?

### Question schema

```js
// question.json
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  name: "Question", // @Entity
  type: "object",
  db: {
    entity: true
  },
  properties: {
    // @PrimaryGeneratedColumn()
    id: {
      type: "string",
      generated: true, // generated
      unique: true, // primary
      required: true
    },
    // @Column()
    title: {
      type: "string"
    },
    // @Column()
    value: {
      type: "integer"
    },
    // @ManyToMany(type => Category)

    // For more granular control, set which property should refer back
    // @ManyToMany(type => Category), category => category.questions, {cascade: true}
    categories: {
      type: "array",
      db: {
        relationship: {
          kind: "many",
          type: "Category",
          backRef: "questions", // implicit name (using pluralize) here set explicitly
          cascade: true
        },
      }
      $ref: "#/definitions/Category" // create QuestionCategory join table implicitly
    }
  }
};
```

### Category

```js
// category
definitions: {
  Category: {
    name: "Category", // @Entity
    type: "object",
    db: {
      entity: true
    },
    properties: {
      // @PrimaryGeneratedColumn()
      id: {
        type: "string",
        generated: true, // generated
        unique: true, // primary
        required: true
      },
      // @Column()
      title: {
        type: "string"
        db: { // explicit column
          column: true
        }
      }
    }
  }
};
```
