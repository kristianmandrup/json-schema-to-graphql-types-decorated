# JSON Schema to GraphQL types with decorators

Convert JSON schema to GraphQL types (string) including GraphQL transforms/directives (decoratots).

## Quick start

- npm: `npm install json-schema-to-graphql-types-decorated -S`
- yarn: `yarn add json-schema-to-graphql-types-decorated`

Use

```js
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/person.schema.json",
  title: "Person",
  description: "A person",
  type: "object",
  properties: {
    id: {
      type: "string",
      generated: true,
      unique: true
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
        type: "Account"
      }
    }
  },
  required: ["name"]
};

const { buildTypes } = require('json-schema-to-graphql-types-decorated')
const mapping = buildTypes(schema);

console.log({
  mapping
});
```

Will output the following GraphQL types (as a raw indented text)

```graphql
type Person {
  id: ID!
  name: String! @connection(name: "UserNames")
  age: Int!
  money: Float
  accounts: [Account]
}
```

Using `config` object (see below)

```js
const mapping = buildTypes(schema, config);

console.log({
  mapping
});
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

### Using meta data in JSON schema

[StackOverflow: json-schema-additional-metadata](https://stackoverflow.com/questions/42357200/json-schema-additional-metadata)

"You don't have to do anything special to use additional metadata keywords. You can just use them. In JSON Schema it is not an error to include undefined keywords."

So the decorators can also be supplied via a `graphql` entry directly in the JSON schema as follows:

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

You can also include `decorators` entry directly as follows:

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

## Customization

You can pass an extra configuration object with specific rules for ES mapping properties that will be merged into the resulting mapping.

```js
const config = {
  _meta_: {
    types: {
      date: "Date", // to use custom Date scalar
      json: "JSON" // to use custom JSON scalar
    }
  }
};

const { buildMapping } = require("json-schema-to-es-mapping");
const mapping = buildMapping(schema, config);
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

Currently not well tested. Please help add more test coverage :)

## TODO

Add support for `enum` type, see [How to design GraphQL queries and mutations: enum type](https://medium.com/graphql-mastery/how-to-design-graphql-mutations-and-queries-part-2-enums-ebb01613832)

The enum type is the second type in the GraphQL specification that can be used as a primitive value.

```js
enum TaskStateEnum {
  assigned
  unassigned
  inProgress
}
```

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
