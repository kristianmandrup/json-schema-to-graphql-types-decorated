# Build models from JSON Schema

## Status

Under development, but mostly complete. Use the classes as a base for your own infrastructure.
Check the tests and markdown files (for each file) for in-depth API documentation.

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

## Design & Architecture

This project is a result of multiple efforts trying to generate source code or derive models from JSON schemas. There is a need for a framework with a set of well tested, battle-tested building blocks to make this much easier. The goal is to achieve true _declarative model driven development_.

Your domain and action models across your stack should automatically be derived from the same underlying declarative model (project blueprint).

### Main concepts

Infrastructure delivered by library

- Builder: builds a set of entities identified by resolvers and dispatches events as needed
- Dispatcher: Dispatches select events to state for update of model
- State: builds collections of entities and a directed graph from incoming model events

Your concerns

- Target model: target model to be built from state can either subscribe to the State or process the State when builder has finished
- Render: Render can be done when Target model has been built

The following examples act to demonstrate how you might go about using this infrastructure to generate source code or models.

### Examples

- [GraphQL example](./samples/graphql/GraphQL.md)
- [TypeORM example](./samples/typeorm/TypeORM.md)

## Testing

Uses [jest](jestjs.io/) for unit testing.

Please help add more/better test coverage :)

### Run tests in watch mode

```bash
$ npm run test:watch
```

### Run all tests

```bash
$ npm run test
```

## TODO

- State subscribers

## Author

2018 Kristian Mandrup (CTO@Tecla5)

## License

MIT
