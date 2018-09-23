# JSON Schema to GraphQL types with decorators

Convert JSON schema to GraphQL types (string) including GraphQL transforms/directives (decoratots).

## Status: WIP

Under development. See the master branch for a stable (but primitive) working solution.

## Quick start

- npm: `npm install json-schema-to-es-mapping -S`
- yarn: `yarn add json-schema-to-es-mapping`

Use

```js
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/person.schema.json",
  title: "Person",
  description: "A person",
  type: "object",
  graphql: {
    decorators: {
      client: true
    }
  },
  properties: {
    id: {
      type: "string",
      generated: true,
      unique: true,
      required: true
    },
    name: {
      description: "Name of the person",
      type: "string",
      graphql: {
        decorators: {
          connection: {
            name: "UserNames"
          }
        }
      }
    },
    age: {
      description: "Age of person",
      type: "integer",
      required: true
    },
    money: {
      description: "Money in pocket",
      type: "number"
    },
    accounts: {
      description: "Bank accounts",
      type: "array",
      items: {
        $ref: "#/definitions/account"
      }
    },
    numberOfChildren: {
      description: "Children parented",
      type: "array",
      items: {
        type: "number",
        enum: [0, 1, 2]
      }
    },
    favoriteCoulor: {
      description: "Colors liked",
      name: "color",
      type: "string",
      items: {
        type: "number",
        enum: ["red", "green", "blue"]
      }
    },
    car: {
      description: "Car owned",
      type: "object",
      decorators: {
        model: true
      },
      properties: {
        name: {
          type: "string",
          required: true
        }
      }
    }
  },
  definitions: {
    account: {
      description: "Bank account",
      type: "object",
      decorators: {
        client: true
      },
      properties: {
        id: {
          type: "string",
          generated: true,
          unique: true,
          required: true
        },
        name: {
          description: "Name of the account",
          type: "string"
        },
        money: {
          description: "Money in account",
          type: "number",
          required: true
        },
        type: {
          description: "Account type",
          // should be implicit: "name": "AccountType",
          type: "string",
          enum: ["saving", "credit"]
        }
      }
    }
  },
  required: ["name"]
};

const { buildTypes } = require("json-schema-to-graphql-types");
const mapping = buildTypes(schema);

console.log({
  mapping
});
```

Will output the following GraphQL types (as a raw indented text)

### Person type

```graphql
type Person {
  id: ID!
  name: String! @connection(name: "UserNames")
  age: Int!
  money: Float
  car: PersonCar
  accounts: [Account]
}
```

### PersonCar type

```graphql
type @model PersonCar {
  name: String!
}
```

### Account type

```graphql
type Account {
  id: ID!
  name: String!
  money: Float!
  type: AccountType
}
```

### AccountType enum

```graphql
enum AccountType {
  saving
  credit
}
```

### Color enum

```graphql
enum Color {
  red
  green
  blue
}
```

## Supporting transforms (decorators)

Add transforms/directives for GraphQL types in a declarative way so they can be included in the generated types.

Allow supplying an extra `config` object with meta data for directives to be merged into output

```js
{
  decorators: {
    Cart: {
      client: true
    }
    User: {
      email: {
        unique: true
      }
    },
    Post: {
      blog: {
        connection: {
          name: 'BlogPosts'
        }
      }
    }
  }
}
```

Simply pass the `config` object as second argument

```js
const types = buildTypes(schema, config);

console.log({
  types
});
```

### Using meta data embedded in JSON schema

[StackOverflow: json-schema-additional-metadata](https://stackoverflow.com/questions/42357200/json-schema-additional-metadata)

"You don't have to do anything special to use additional metadata keywords. You can just use them. In JSON Schema it is not an error to include undefined keywords."

The GraphQL decorators can also be supplied via a `graphql` entry directly in the JSON schema as follows:

```js
properties: {
  blog: {
    type: 'string'
    graphql: {
      decorators: {
        connection: {
          name: 'BlogPosts'
        }
      }
    }
  },
}
```

You can alternatively use the `decorators` entry directly as follows.

```js
properties: {
  blog: {
    type: 'string'
    decorators: {
      connection: {
        name: 'BlogPosts'
      }
    }
  },
}
```

You might want to use decorators for other purposes as well (for other generators).
We recommend namespacing `decorators` under `graphql` for large projects that heavily relies on a schema driven development approach.

## Type customization

The configuration object can take type mappings that will be used in the generated types.

```js
const config = {
  _meta_: {
    types: {
      date: "Date", // to use custom Date scalar
      json: "JSON" // to use custom JSON scalar
    }
  }
  decorators: {
    // ...
  }
};

const types = buildTypes(schema, config);
```

## Supporting Scalars

Please see [GraphQL scalar type and its input and result coercion](https://medium.com/graphql-mastery/graphql-scalars-and-enums-part-1-built-in-scalars-overview-and-application-4a85f841698f)

### Date scalar

- [Date as a scalar](https://www.apollographql.com/docs/graphql-tools/scalars.html#Date-as-a-scalar)
- [graphql-iso-date](https://www.npmjs.com/package/graphql-iso-date)

You can customize the output to use your own scalar types via `config._meta_.types`. The builder (generator) currently assumes you are using the `Date` scalar by default.

## GraphQL transforms

### Amplify

[Amplify GraphQL transforms](https://aws-amplify.github.io/amplify-js/media/api_guide#using-graphql-transformers)

- `@model`
- `@auth`
- `@connection`
- `@searchable`

Also see [graphql-transform-tutorial](https://github.com/aws-amplify/amplify-cli/blob/master/graphql-transform-tutorial.md)

```js
type Post @model {
  id: ID!
  title: String!
  blog: Blog @connection(name: "BlogPosts")
  comments: [Comment] @connection(name: "PostComments")
}
```

### Prisma

[Prisma](https://www.prisma.io/docs/prisma-graphql-api/queries-qwe1/)

```js
type User {
  id: ID! @unique
  age: Int
  email: String! @unique
  name: String!
  accessRole: AccessRole
  posts: [Post!]!
}
```

### Apollo

[Apollo](https://www.apollographql.com/docs) has a [@client directive](https://www.apollographql.com/docs/link/links/state.html#directive) for [Apollo Link State](https://www.apollographql.com/docs/link/links/state.html)

Adding the `@client` directive to a field is how Apollo Link knows to resolve your data from the Apollo cache instead of making a network request. This approach is similar to other Apollo Link APIs, such as apollo-link-rest, which uses the `@rest` directive to specify fields that should be fetched from a REST endpoint.

```js
const getUser = gql`
  query getUser($id: String) {
    user(id: $id) {
      id
      name
      cart @client {
        product {
          name
          id
        }
      }
    }
  }
`;
```

Thanks to the power of directives and Apollo Link, you’ll (soon) be able to request `@client` data, `@rest` data, and data from your GraphQL server all in one query!

## Alternatives

- [graphql-to-json-schema](https://github.com/wittydeveloper/graphql-to-json-schema) GraphQL Schema to JSON Schema
- [json-schema-to-graphql-types](https://github.com/lifeomic/json-schema-to-graphql-types)
- [jsonschema-to-graphql](https://github.com/ManjunathaN/jsonschema-to-graphql)

## Testing

Uses [jest](jestjs.io/) for unit testing.

Please help add more test coverage :)

### Run tests in watch mode

Also lets you filter which tests to run (press `p`)

```bash
$ npm run test:watch
```

### Run all tests

```bash
$ npm run test
```

## TODO

### Union types

Add support for [union types](https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d)

Especially useful for arrays that can have multiple types under `items`.

```graphql
union SearchResult = User | Movie | Book
```

### Enum

WIP

Add good support for `enum` type, see [How to design GraphQL queries and mutations: enum type](https://medium.com/graphql-mastery/how-to-design-graphql-mutations-and-queries-part-2-enums-ebb01613832)

The enum type is the second type in the GraphQL specification that can be used as a primitive value.

```js
enum TaskStateEnum {
  assigned
  unassigned
  inProgress
}
```

### Use to generate TypeORM models

We should be able to use the same infrastructure to generate TypeORM entity model classes with property types and relationship decorators.

Note: Would likely be better to create a directed graph from JSON schema and build from there ;)

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
