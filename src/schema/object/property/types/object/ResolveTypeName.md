# ObjectTypeNameResolver

Used to resolve the type name for an object.

## Object type name examples and resolution strategies

### By key

In the most simple case there is only the `key` to go by, which is the name of the property

```js
person {
  car: {
    type: 'object'
    properties: {
      // ...
    }
  }
}
```

We can here assume either that:

- assume the type is the same as the property, such as `car: Car`.
- use a `fullName` type name such as `[ownerName, key].join()`
- the type is generic

In this case use the `fullName` strategy and default to a default type `Object`

### Definition ref

If the object is referencing a definition `#/definition/MegaCar`

```js
person: {
  car: {
    $ref: '#/definition/MegaCar'
  }
},
// ...
definitions: {
  MegaCar: {
    // ...
  }
}
```

We will use the ref name `MegaCar`.

### Name entry

If the value has a `name` entry, we use that.

```js
car: {
  type: 'object',
  name: 'SuperCar',
  properties: {
    // ...
  }
}
```

### Full strategy

We use the name of the first strategy that provides a name in the followin order:

- `refTypeName`
- `name`
- `fullName`
- `defaultType`

Can be expressed as: `refTypeName || name || fullName || defaultType`

Note: If any of the non-default strategies return a name, we expect to have detected a new valid `type` and will `dispatch` an event with information on this finding.

## resolve

Delegates to `resolvedTypeName`

```js
resolve() {
  return this.resolvedTypeName
}
```

## typeName

Tries resolving type name via various naming strategies, using `resolvedTypeName`.
If not enough information available, defaults to using `defaultType`

```js
get typeName() {
  const {object} = this
  const name = this.resolvedTypeName || this.defaultType
  return camelize(name)
}
```

### resolvedTypeName

Tries various naming strategies to resolve the object type name.

Note: Uses memoization to avoid name recalculation

```js
get resolvedTypeName() {
  const {object} = this
  const {refTypeName, name, fullName} = object
  this._resolvedTypeName = this._resolvedTypeName || (refTypeName || name || fullName)
  return this._resolvedTypeName
}
```
