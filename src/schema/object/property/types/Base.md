# Base type resolver

All property type classes have the following:

## Constructor

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

## Methods

- `resolveAndMergeReferenced`
- `extractMeta`
- `extractDecorators`

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

## Accessors

- `refResolver`
- `refObject`
- `shape`
- `valid`
- `type`

### refResolver

```js
get refResolver() {
  const args = {
    schema: this.rootSchema,
    reference: this.reference
  }
  this._defRef = this._defRef || createDefinitionRefResolver(args)
  return this._defRef
}
```

### refObject

Resolves and returns object referenced by `$ref` reference

```js
get refObject() {
  return this.reference
    ? this.refResolver.refObject
    : {}
}
```

### valid

`valid` is by default `true`

### type

Object

#### property

The _raw_ type of the JSON schema property

- `string`
- `boolean`
- `number`
- `integer`
- `object`
- `array`

#### format

The _raw_ format of the JSON schema property

- `date-time`
- `email`
- ...

### expandedType

The normalized (expanded) type that better reflect common type usage contexts

- `string`
- `boolean`
- `number`
- `integer`
- `float`
- `enum`
- `date`
- `object`
- `array`

### kind

The main kind of property type

- `primitive`
- `enum` (enumerator)
- `type` (class)

Can be customized depending on context. This will

### shape

The `shape` should be used to expose parts of the data collected in a structured manner

```js
{
  // decorators extracted from value and config
  decorators: this.decorators,
  // the full config
  config: this.config,
  // the full property received as input
  property: this.property,
  name: this.name,
  // custom meta data
  meta: this.meta,
  // various type information
  type: {
    ...this.type,
    base: this.baseType,
    // string, number, enum, date, ...
    expanded: this.expandedType,
    // primitive, enum or type
    kind: this.kind,
    // ownerName + key
    fullName: this.fullTypeName,
    resolved: this.resolvedTypeName,
    // for Array or Object
    reference: {
      resolved: this.reference,
      names: this.typeNames,
      name: this.typeName
    }
  },

  valid: Boolean(this.valid),
  required: Boolean(this.required),

  // usually for Array or Object
  collection: Boolean(this.collection),
  list: Boolean(this.list),
  dictionary: Boolean(this.dictionary)
}
```

### refType

`refType` can be used to indicate if the property referes to a foreign type entity as a `reference` or `embedded`. By default, if `reference` is set then `refType === 'reference'` otherwise it will be set to `embedded`. The usefulness of this distinction depends on the usage context. F.ex document DBs such as Mongo DB support both notions.

```js
get ref() {
  return this.reference
    ? 'reference'
    : 'embedded'
}
```

### meta

Meta data object. By default empty. Customize as needed for your context/scenario to supply additional shape data.

### name

The property `name` is the `name` atribute, defaulting to the property `key` value.

### fullTypeName

Calculates and returns the full type name, using the `pathNames` (see below)

```js
  get fullTypeName() {
    const name = this
      .pathNames
      .join(this.separator.type)
    return camelize(name)
  }
```

### fullName

The full name of the property, using the `pathNames` (see below)

```js
get fullName() {
return this
  .pathNames
  .join(this.separator.name)
}
```

### pathNames

The path names (usually owner `name` and property `key`)

```js
get pathNames() {
  return [this.owner.name, this.key]
}
```

### separator

Separators used to create `fullName` and `fullTypeName` from the `pathNames`

```js
get separator() {
  return {name: '_', type: '_'}
}
```

### typeNames

The type names resolved for array items. Empty list by default.

```js
get typeNames() {
  return []
}
```

### hasTypeNames

If the property has a non-empty list of type names

### typeName

The `typeName` should return the name of the type referenced by the property.

Depending on the context, this could be f.ex `Car` for an object type reference via `$ref: '#/definitions/vehicles/car'`

The `typeName` should be `undefined` if the property is a primitive.

```js
get typeName() {
  return this.reference && this.refResolver.typeName
}
```

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
