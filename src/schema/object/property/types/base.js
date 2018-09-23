const {Base} = require('../../../../base')

class PropertyError extends Error {}

class BaseType extends Base {
  constructor(property, config) {
    let {name, key, type, value} = property

    config = config || {}
    this.property = property
    this.key = key
    this.clazz = name
    this._type = type
    this.value = value
    this.format = value.format
    this.required = value.required
    this.config = config
    this.built = built

    this.extractMeta()
  }

  extractMeta() {
    this._meta = this.config._meta_ || {}
    this._types = this._meta.types || {}
  }

  get valid() {
    return true
  }

  get shape() {
    const shape = {
      jsonPropType: this.type, // raw
      expandedType: this.kind, // string, number, enum, date, ...
      is: this.is,
      category: this.category, // primitive, enum or object
      className: this.clazz, // Person, Car
      key: this.key,
      name: this.name, // name, age, ...
      valid: Boolean(this.valid),
      required: Boolean(this.required),
      multiple: Boolean(this.multiple)
    }

    if (this.refType) {
      shape.refType = this.refType
    }
    if (this.refTypeName) {
      shape.refTypeName = this.refTypeName
    }

    return shape
  }

  get ref() {
    return undefined
  }

  get multiple() {
    return false
  }

  get list() {
    return false
  }

  get dictionary() {
    return false
  }

  get name() {
    return this.value.name || this.key
  }

  get refTypeName() {
    this.error('refTypeName', 'must be specified by subclass')
  }

  get configType() {
    return this._types[this.name]
  }

  get overrideType() {
    return this.configType || this._specialType
  }

  traverseNested() {
    return this
  }

  error(name, msg) {
    name = [this.key, this.type, name].join('::')
    super.error(name, msg)
  }

  get refType() {
    return this.reference
      ? 'reference'
      : 'embedded'
  }
}

module.exports = {
  BaseType,
  PropertyError
}
