# TypeORM

Derive TypeORM schemas (or relational ORM schemas in general) from JSON schema.

## Relationships

- Many to many
- One to many

See [Relations](./Relations.md)

### Example

Ideal source code export:

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
