const {MappingBaseType} = require('./base')
const {camelize} = require('./utils')

function isObject(obj) {
  return obj.type === 'object'
}

function toObject(obj) {
  return isObject(obj) && MappingObject
    .create(obj)
    .resolveNested()
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  constructor(obj) {
    super(obj)
    this.properties = this.value.properties
    this.reference = this.value.$ref
  }

  get refType() {
    return this.baseType
  }

  get baseType() {
    const name = this._baseType
    return name && camelize(name)
  }

  get _baseType() {
    return this.reference
      ? this.resolveRefName
      : this.name
  }

  static create(obj) {
    return new MappingObject(obj)
  }

  get is() {
    return 'type-ref'
  }

  get typeDef() {
    return {is: 'type'}
  }

  get schema() {
    return this.properties
      ? this.value
      : this.referencedSchema
  }

  // TODO: follow $ref
  get referencedSchema() {
    return {type: 'object', properties: {}}
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
    this.nested = resolveSchema(this.schema, this.config, this.built)
    return this
  }
}

module.exports = {
  toObject,
  MappingObject
}

const {resolveSchema} = require('../schema/schema')
