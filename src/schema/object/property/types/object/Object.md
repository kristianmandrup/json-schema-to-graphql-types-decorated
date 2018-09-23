# Object

## resolving object type

See [Type Ref](../TypeRef.md)

In the most simple case there is only the key to go by, which is the name of the property

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

We can here assume either that the type is the same, such as `car: Car` or `car: PersonCar`

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

We will use the ref name `MegaCar`. If the value has a `name` we use that.

```js
car: {
  type: 'object',
  name: 'SuperCar',
  properties: {
    // ...
  }
}
```

The strategy:

fullName: `[class, key].join()`

`refTypeName || name || fullName`

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
