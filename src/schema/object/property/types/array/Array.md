# Array

An Array can have items of one or more types. The items can either be embedded (like in a JSON document) or referenced (like in a graph).

Some contexts only allow an array to have a single type for all elements, whereas other use a Union type (such as GraphQL, TypeScript etc).

Array simply notifies about the type references resolved and lets the end consumer handle the details.

## resolveTypeRefs

Uses `arrayTypeRefs.resolve()` to resolve type refs then notifies when resolved.

```js
  resolveTypeRefs() {
    const typeRefs = this
      .arrayTypeRefs
      .resolve()
    this.onTypeRefs(...typeRefs)
    return this
  }
```

### onTypeRefs

`onTypeRefs` is used to notify that multiple type refs have been resolved, by default simply calling `onTypeRef` to notify for each

```js
  onTypeRefs(...typeRefs) {
    typeRefs.map(typeRef => this.onTypeRefs(typeRef))
  }
```

### onTypeRef

`onTypeRef` is used to notify that a single type ref has been resolved

```js
  onTypeRef(typeRef) {
    this
      .state
      .addRef(this, typeRef, {refType: this.refType})
  }
```
