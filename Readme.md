# Build models from JSON Schema

## Status

Under development, but mostly complete. Use the classes as a base for your own infrastructure.
Check the tests and markdown files (for each file) for in-depth API documentation.

## Examples

- [GraphQL example](./samples/graphql/GraphQL.md)
- [TypeORM example](./samples/typeorm/TypeORM.md)

## Quick start

- npm: `npm install json-schema-model-builder -S`
- yarn: `yarn add json-schema-model-builder`

## Use

Something like this...

```js
import { schema } from "./schemas/person.json";
import { config } from "./config";
import { createBuilder, createState } from "json-schema-model-builder";

const state = createState({ config });
const builder = createBuilder({ state, schema, config });
const built = builder.build();
const rendered = built.render();

// Render the darn thing!
console.log({ rendered });
```

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
