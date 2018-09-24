# Object

## resolving object type

See [Object Type Name Resolver](../ObjectTypeNameResolver.md)

## Resolving object

To resolve the object:

- resolve type
- resolve nested properties

```js
resolve() {
  this.resolveType()
  this.resolveNested()
  return this
}
```

If we can resolve the object `typeName` we create and `dispatch`
an `event` with:

- `ownerTypeName`
- `propertyName`
- `typeName`

This information can then be used to create relationships by whatever engine captures the event, such as adding nodes and an edge to a graph to reflect the relationships.

If no type name is resolved, no worries, as in the end we will let the `objectTypeNameResolver` resolve it when needed (using a fallback default type).

```js
resolveType() {
  const typeName = this.resolveTypeName()
  if (!typeName)
    return
  this.dispatch({
    payload: {
      ownerName: this.ownerName,
      propertyName: this.key,
      typeName,
      object: true
    }
  })
}
```

To resolve the type name we use `objectTypeNameResolver`, an instance of `ObjectTypeNameResolver` with functionality to resolve using the type name resolution strategies outlined. We call `typeName` to get the type name with fall back.

```js
get resolvedTypeName() {
  return this.objectTypeNameResolver.typeName
}
```

`resolvedTypeName` creates and sets the `typeName` instance used to resolve the full object type name. When called by `resolve` it returns a type name if available.

```js
get resolveTypeName() {
  this.objectTypeNameResolver = new ObjectTypeName({object: this, config: this.config})
  return typeName.resolve()
}
```

## resolveNested

Resolves object by recursion if it is a valid object (ie. has `properties`)

```js
resolveNested() {
  if (!this.valid)
    return this
  const nested = new Nested({value: this.value})
  nested.resolve()
  return this
}
```

As the object is recursed, it will continue calling `add` whenever a new `object` definition is found and so on...
