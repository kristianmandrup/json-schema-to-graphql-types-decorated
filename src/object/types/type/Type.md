# Type resolution

## Object

### Inline object type

- un-named
- named

#### Un-named inline object

```json
"account": {
  "description": "Bank account",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

In this case the generator will assume that the account type is private to the type of the account (`Person`) and will thus generate a `PersonAccount` type.

```graphql
type Person {
  account: PersonAccount
}

type PersonAccount {
  name: String
}
```

#### Named inline object

```json
"account": {
  "description": "Bank account",
  "type": "object",
  "name": "PersonalAccount",
  "properties": {
    "name": {
      "type": "string"
    }
  }
}
```

In this case the generator will use the `name` of the object type `PersonalAccount` as the property reference type

```graphql
type Person {
  account: PersonalAccount
}

type PersonalAccount {
  name: String
}
```

### Referenced object type

```json
"car": {
  "type": "object",
  "$ref": "#/definitions/vehicle"
}
```

In this case it will simply take the last part of the reference path `vehicle` and camelize it to produce the name of the type.

```graphql
type Person {
  car: Vehicle
}

type Vehicle {
  name: String
}
```

Ideally we should look up the definition, check if it is present and then resolve it and the name appropriately. Will be added in a future release.

## Array

An `array` type can have items of multiple supported types.
Currently we only support generation for a array item type. Support for union types will be added in a later release.

GraphQL interfaces could be used to achieve a similar effect but don't map/translate well to JSO schema.

### Multiple item types

An `array` can be configured to accept multiple different types of items.

[GraphQL interfaces and unions](https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d)

```js
"account": {
  "type": "array",
  "items": [
    {
      "$ref": "#/definitions/account"
    },
    {
      "type": "string"
    }
  ]
}
```

Ideally we like to generate this case using a Union type as follows:

```graphql
union AccountItem = Account | String

type Person {
  account: [AccountItem]
}
```

For now however, we will limit this library to just use the first item type it finds, in this case the reference to `account`. The `string` will be ignored for now.

Union types and interfaces will be supported in a later release.

```graphql
type Person {
  account: [Account]
}
```

### Type definition reference

```js
{
  "description": "Bank accounts",
  "type": "array",
  "name": "accounts",
  "items": [
    {
      "$ref": "#/definitions/account"
    }
  ]
}
```

### Simple item type

A simple `String`

```js
{
  "description": "Bank accounts",
  "type": "array",
  "name": "accounts",
  "items": [
    {
      "type": "string"
    }
  ]
}
```

### Special item type

Example: "virtual" `Date` type.

```js
{
  "description": "Bank accounts",
  "type": "array",
  "name": "accounts",
  "items": [
    {
      "type": "string",
      "format": "date-time"
    }
  ]
}
```
