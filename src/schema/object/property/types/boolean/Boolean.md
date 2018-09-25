# Boolean type resolver

Default data extraction and behavior supported by `Base` class extended.

## kind

`primitive`

## expandedType

`boolean`

## resolvedTypeName

The resolved type name. By default `Boolean` but can be overridden by the `_types` map.

```js
get resolvedTypeName() {
  return camelize(this._types.date || 'Boolean')
}
```
