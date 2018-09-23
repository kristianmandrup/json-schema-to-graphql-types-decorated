const {BaseType} = require('../base')
const {camelize} = require('../utils')

// no reason to test for properties, as we might be using $ref instead
function isObject(property) {
  return property.type === 'object'
}

function resolve({property, config}) {
  return isObject(property) && ObjectType
    .create({property, config})
    .resolveNested()
}

// Allow recursive schema
class ObjectType extends BaseType {
  constructor(property, config) {
    super(property, config)
    this.properties = this.value.properties
    this.reference = this.value.$ref
    this.resolveSchema = config.resolveSchema
    this.$schemaRef = config.$schemaRef
  }

  get kind() {
    return 'object'
  }

  get refType() {
    return this.baseType
  }

  get defaultType() {
    return 'Object'
  }

  get baseType() {
    const name = this._baseType
    return name && camelize(name) || this.defaultType
  }

  get _baseType() {
    return this.reference
      ? this.resolveRefName
      : this.name
  }

  static create(obj) {
    return new ObjectType(obj)
  }

  get category() {
    return 'class'
  }

  get multiple() {
    return true
  }

  get dictionary() {
    return true
  }

  get schema() {
    return this.properties
      ? this.value
      : this.referencedSchema
  }

  // TODO: follow $ref using new DefinitionRef class
  get referencedSchema() {
    return this.$schemaRef || {}
  }

  get valid() {
    return this.properties || this.reference
      ? true
      : false
  }

  resolveNested() {
    this.valid
      ? this._resolve()
      : this._noResolve()
    return this
  }

  _noResolve() {
    // this.error(`${this.key}: missing object properties`)
  }

  _resolve() {
    !this.resolveSchema && this.error('resolve', 'missing resolveSchema')
    this.nested = this.resolveSchema({schema: this.schema, config: this.config})
    return this
  }
}

module.exports = {
  isObject,
  resolve,
  ObjectType
}
