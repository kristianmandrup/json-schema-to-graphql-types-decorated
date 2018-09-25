# Property Entity Resolver

The `PropertyEntityResolver` is used to resolve a property value of an object or schema to a target `Entity`. The entity has a `shape` with information.

## resolve

Used to resolve a `property`. Iterates through all of the `resolvers` and tries to call `resolver.resolve(property)` on each. The results are collected in a `map`.

By default the property is set up to collect an entity as either:

- `primitive`
- `object`
- `enum`

The resolver decides which entity it is and calls `onEntity(entity)` (by default to dispatch the an event with the entity). Finally `resolve` returns the resolved entity.

## onEntity

Use `onEntity` to handle when a new entity has been resolved.
By default the entity is dispatched to the dispatcher which then adds the entity to the `state` via `add(entity, type)`

````js
  onEntity(entity) {
    this.dispatch({
      payload: {
        ...entity
      }
    })
  }

  dispatch({payload}) {
    const event = {
      sender: this.sender,
      payload: payload
    }
    if (!this.dispatcher)
      this.warn('dispatch', 'missing dispatcher')
    this
      .dispatcher
      .dispatch(event)
  }```

Further on...

```js
this.state.add(entity.value, entity.type);
````
