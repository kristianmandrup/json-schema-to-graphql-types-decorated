# String type resolver

Resolve type information for a string property

## defaultType

`String`

## baseType

Looks up custom type then defaults to using `defaultType`

```js
get baseType() {
  return this._types.string || this.defaultType
}
```
