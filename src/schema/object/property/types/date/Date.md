# Date type resolver

Default data extraction and behavior supported by `Base` class extended.

## kind

`primitive`

## expandedType

`date`

## resolvedTypeName

The resolved type name. By default `Date` but can be overridden by the `_types` map.

```js
get resolvedTypeName() {
  return camelize(this._types.date || 'Date')
}
```
