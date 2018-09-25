# Array

An Array can have items of one or more types. The items can either be embedded (like in a JSON document) or referenced (like in a graph).

Some contexts only allow an array to have a single type for all elements, whereas other use a Union type (such as GraphQL, TypeScript etc).

Array simply notifies about the type references resolved and lets the end consumer handle the details.

## kind

`primitive`

## collection

`true`

## list

`true`

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

## firstTypeName

Gets the first reference type name

```js
get firstTypeName() {
  return this.typeNames[0]
}
```

## hasSingleType

If array only has a single reference item

```js
get hasSingleType() {
  return this.typeNameCount === 1
}
```

## hasMultipleTypes

If array has a multiple items

```js
get hasMultipleTypes() {
  return this.typeNameCount > 1
}
```

```js
get typeNameCount() {
  return this.typeNames.length
}
```

## unionTypeName

```js
get unionTypeName() {
  return `${this.fullClassName}Item`
}
```

## typeNames

The list of reference type names. Perhaps rename to `itemTypeNames` or `resolveTypeNames`?

```js
get typeNames() {
  this._typeNames = this._typeNames || this
    .itemsResolver
    .resolve()
  return this._typeNames
}
```

## resolveTypes

Uses `arrayTypeRefs.resolve()` to resolve type refs then notifies when resolved.

```js
resolveTypes() {
  this.onTypes(...this.typeNames)
  return this
}
```

### onTypes

`onTypes` is used to notify that multiple types have been resolved, by default simply calling `onType` to notify for each

Dispatcher can decide to add `types` (list of type names extracted from `items` valid for Array) as a `union` type, as well as adding edges to state graph etc.

```js
  onTypes(...types) {
    const payload = this.createPayload({types: types})
    this.dispatch({payload})
    types.map(type => this.onType(type))
  }
```

### onType

`onType` is used to notify that a single type ref has been resolved.
Dispatcher decides how to handle each new array type

```js
  onType(type) {
    const payload = this.createPayload({type: type})
    this.dispatch({payload})
  }
```

### createPayload

Creates a payload ready to be dispatched

```js
createPayload(payload = {}) {
  return {
    ...payload,
    shape: this.shape,
    type: this.expandedType
  }
}
```
