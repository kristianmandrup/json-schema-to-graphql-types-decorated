# Property

The `Propeety` class is used to resolve a property from the schema.

## resolve

Used to resolve a `property`. Goes through each of the `resolvers` and tries to call `resolver.resolve(property)` on each. The results are collected in a `map`.

By default the propeety is set up to collect an entity as either:

- `primitive`
- `object`
- `enum`

We then decide which entity it is and call `onEntity(entity)` and return the entity as well.

## onEntity

Use `onEntity` to handle when a new entity has been resolved.
By default the entity is added to the `state` via `add(entity, type)`

```js
onEntity(entity) {
  this
    .state
    .add(entity.value, entity.type)
}
```
