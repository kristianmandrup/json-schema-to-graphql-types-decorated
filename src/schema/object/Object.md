# ObjectSchema

`ObjectSchema` resolves an `object` or a full `schema`.

- validate it is a valid JSON schema `object`
- If full schema: normalize `required` list of schema properties into each individual property
- create and resolve properties

## Validate

Must have `properties` object and have `type: 'object'`

```js
validate() {
  return this.validateProperties() && this.validateType()
}
```

## Normalize

Normalize `required` list from schema to add as `required` entry in each object property.

```js
normalize() {
  this.shouldNormalize() && this.normalizeProps()
}
```

## Resolve properties

Create an `object` with `properties` and `ownerName` (name of object)

Create a `PropertiesResolver` and use it to resolve the `properties` of the `object`

```js
resolve() {
  const object = {
    ownerName: name,
    properties: this.properties
  };
  const resolver = createPropertiesResolver({object, config})
  return resolver.resolve()
}
```

## Properties Resolver

See [Properties Resolver](./Properties.md)
