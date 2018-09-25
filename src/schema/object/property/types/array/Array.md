# Array

An Array can have items of one or more types. The items can either be embedded (like in a JSON document) or referenced (like in a graph).

Some contexts only allow an array to have a single type for all elements, whereas other use a Union type (such as GraphQL, TypeScript etc).

Array simply notifies about the type references resolved and lets the end consumer handle the details.

## kind

`primitive`

## expandedType

`array`

## itemsResolver

A resolver to resolve `items` to type name

## typeName

The resolved reference type name. If the array has multiple ref types, a union type name is generated.

```js
get refTypeName() {
  return this.refTypeNameCount === 1
    ? this.firstRefTypeName
    : `${this.fullClassName}Item`
}
```

## firstRefTypeName

Gets the first reference type name

```js
get firstRefTypeName() {
  return this.refTypeNames[0]
}
```

## hasSingleRefType

If array only has a single reference item

```js
get hasSingleRefType() {
  return this.refTypeNameCount === 1
}
```

## hasMultipleRefTypes

If array has a multiple reference items

```js
get hasMultipleRefTypes() {
  return this.refTypeNameCount > 1
}
```

```js
get refTypeNameCount() {
  return this.refTypeNames.length
}
```

## unionTypeName

```js
get unionTypeName() {
  return `${this.fullClassName}Item`
}
```

## refTypeNames

The list of reference type names. Perhaps rename to `itemTypeNames` or `resolveTypeNames`?

```js
get refTypeNames() {
  this._refTypeNames = this._refTypeNames || this
    .itemsResolver
    .resolve()
  return this._refTypeNames
}
```

## resolveTypeRefs

Uses `arrayTypeRefs.resolve()` to resolve type refs then notifies when resolved.

```js
resolveTypeRefs() {
  const typeRefs = this.refTypeNames
  this.onTypeRefs(...typeRefs)
  return this
}
```

### onTypeRefs

`onTypeRefs` is used to notify that multiple type refs have been resolved, by default simply calling `onTypeRef` to notify for each

Dispatcher can decide to add `typeRefs` (list of type names extracted from `items` valid for Array) as a `union` type, as well as adding edges to state graph etc.

```js
onTypeRefs(...typeRefs) {
  const payload = {
    typeRefs: typeRefs,
    refTypeName: this.refTypeName,
    union: this.hasMultipleRefTypes,
    single: this.hasSingleRefType,
    array: true
  }

  this.dispatch({payload})
  typeRefs.map(typeRef => this.onTypeRefs(typeRef))
}
```

### onTypeRef

`onTypeRef` is used to notify that a single type ref has been resolved

```js
onTypeRef(typeRef) {
  const payload = {
    ...typeRef,
    refType: this.refType,
    array: true
  }
  // dispatcher decides what to do with these types, such as adding edges etc
  this.dispatch({payload})
}
```
