# Property Types

Property types in most contexts can roughly be categorized into the following

- `primitive` (string, number, boolean, ...)
- `class` (type, model, entity etc.)
- `enum`

## Base

All property type classes have the following:

### Constructor

```js
this.resolveSchema = config.resolveSchema;
this.$schemaRef = config.$schemaRef;
this.reference = this.value.$ref;
this.defRef = new DefinitionRef({
  schema: this.$schemaRef,
  reference: this.reference
});
this.resolveAndMergeReferenced();

this.extractMeta();
this.extractDecorators();
```

### resolveAndMergeReferenced

`resolveAndMergeReferenced` resolves a `$ref` reference and merges the object into the property `value`

```js
resolveAndMergeReferenced() {
  const remoteObject = this
    .defRef
    .resolveObjct()
  this.value = {
    ...this.value,
    remoteObject
  }
}
```

### extractMeta

`extractMeta` is used to extract metadata, either from within the property itself or by lookup in the `config`. Note that JSON schema allows you to add extea entries to suit a particular context.

By default it extracts a `meta` object from a `_meta_` field in `config`.
It also extract a `types` map from within that meta data object. The `types` map can be used to lookup override types (see below).

```js
extractMeta() {
  this._meta = this.config._meta_ || {}
  this._types = this._meta.types || {}
}
```

You can extract extra meta data to suit your particular context as needed in your own Property Type classes.

### extractDecorators

Extracts decorators for the current `namespace` (context) with fall back to generic decorators

```js
extractDecorators() {
  const {namespace} = this.config
  const ns = this.value[namespace] || {}
  const ownDecorators = ns.decorators || $graphql
  const decorators = this.config.decorators || {}
  this.classDecorators = (decorators[type] || {})[key]
  this.propDecorators = decorators[key]
  this._decorators = ownDecorators || this.classDecorators || this.propDecorators
}
```

### valid

`valid` is by default `true`

### type

The _raw_ type of the JSON schema property

- `string`
- `number`
- `boolean`
- `object`
- `array`

### kind

The normalized (expanded) type, to better reflect most usage contexts

- `string`
- `enum`
- `date`
- `object`
- `integer`
- `float`

### category

Property category

- `primitive`
- `enum`
- `class`

Can be customized depending on context

### is

Customize as needed (`undefined` by default)

### shape

Shape returns the data collected from the JSON property.

```js
{
  decorators: this.decorators, // decorators extracted from value and config
  config: this.config, // the full config
  value: this.value, // the full property value
  jsonPropType: this.type, // raw
  expandedType: this.kind, // string, number, enum, date, ...
  is: this.is,
  category: this.category, // primitive, enum or object
  fullClassName: this.fullClassName, // ownerName + key
  ownerName: this.ownerName, // Person, Car whoever has the property that references this object
  baseType: this.baseType, // base type
  // the resolved type, such as PersonCar for a Car object under a Person or MegaCar for a remote ref
  resolvedTypeName: this.resolvedTypeName,
  key: this.key,
  valid: Boolean(this.valid),
  required: Boolean(this.required),
  multiple: Boolean(this.multiple)
}
```

### refType

`ref` can be used to indicate if the property is a `reference` or `embedded`.
This is by default controlled via setting the `reference`

```js
get ref() {
  return this.reference
    ? 'reference'
    : 'embedded'
}
```

### name

The property `name` is gathered either from the `value` or by the `key` of the containing object schema definition.

```js
get name() {
  return this.value.name || this.key
}
```

### resolvedTypeName

The `refTypeName` should return the name of the type referenced by the property.
Depending on the context, this could be f.ex `Car` for an object type reference via `$ref: '#/definitions/vehicles/car'`

The `refTypeName` should be `undefined` if the property is a primitive.

```js
get refTypeName() {

}
```

### fullClassName

The full

```js
get fullClassName() {
  return camelize([this.clazz, this.key].join())
}
```

ownerName: this.ownerName, // Person, Car whoever has the property that references this object
baseType: this.baseType, // base type

the resolved type, such as PersonCar for a Car object under a Person or MegaCar for a remote ref

resolvedTypeName: this.resolvedTypeName,

key: this.key,

### configType

The `configType` is set to if resolved from the config types map by property `name`.
This can be used to override the default type on an individual name basis.

```js
get configType() {
  return this._types[this.name]
}
```

### overrideType

This `overrideType` is used to override the default type if set. It uses the `configType` or the `_specialType` if set (usually in `extractMeta`)

```js
get overrideType() {
  return this.configType || this._specialType
}
```

### collection

`collection` can be set to indicate if the property is a collection entity, such as a dictionary (object/map) or list (array) etc. By default `false` but true for `array` and `object`

```js
get collection() {
  return false
}
```

### list

`list` can be set to indicate if the property is a list collection entity, such as an `array`. By default true only for `array`

```js
get list() {
  return false
}
```

### dictionary

`dictionary` can be set to indicate if the property is a list collection entity, such as an `array`. By default true only for `array`

```js
get dictionary() {
  return false
}
```
