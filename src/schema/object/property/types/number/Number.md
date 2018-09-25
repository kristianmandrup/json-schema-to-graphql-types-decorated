# Number type resolver

The `NumberType` resolver is used for JSON property with a `type` of either `number` or `integer`.

## kind

`primitive`

## expandedType

The expanded type is by default either

- `number`
- `integer`

By default only the property `type` is considered. You can customize this futher as needed.

```js
get expandedType() {
  return isIntegerType(this.type)
    ? 'integer'
    : this.defaultType
}
```

## baseType

The base type name, by default either:

- `Float`
- `Int`

By default considering only the original property `type`. Customize as needed.

```js
get baseType() {
  return this.type.property === 'number'
    ? this.baseNumberType
    : this.baseIntegerType
}

get baseNumberType() {
  this._types.number || this.baseFloatType
}

get baseFloatType() {
  this._types.float || 'Float'
}

get baseIntegerType() {
  this._types.integer || 'Int'
}
```
