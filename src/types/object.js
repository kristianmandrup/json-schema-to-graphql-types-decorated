const {MappingBaseType} = require('./base')
const {camelize, isObjectType} = require('./utils')

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

  get baseType() {
    const name = this._baseType
    return camelize(name)
  }

  get _baseType() {
    return this.reference
      ? this.resolveRefName
      : this.name
  }

  // TODO: lookup reference and determine name there!
  get resolveRefName() {
    const paths = this
      .reference
      .split('/')
    return paths[paths.length - 1]
  }

  static create(obj) {
    return new MappingObject(obj)
  }

  get is() {
    return 'type-ref'
  }

  // TODO: how to determine this?
  get ref() {
    return this.reference
      ? 'reference'
      : 'embedded'
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

const {resolveSchema} = require('../schema')
