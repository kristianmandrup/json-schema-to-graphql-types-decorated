const {MappingBaseType} = require('./base')

const {resolveSchema} = require('../schema')

function isObjectType(obj) {
  return obj === Object(obj);
}

function isObject(obj) {
  return obj.type === 'object'
}

function toObject(obj) {
  return isObject(obj) && MappingObject
    .create(obj)
    .resolveNested()
    .shape
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  constructor(obj) {
    super(obj)
    this.properties = this.value.properties
  }

  get baseType() {
    return 'object'
  }

  static create(obj) {
    return new MappingObject(obj)
  }

  get is() {
    return 'type-ref'
  }

  // TODO: how to determine this?
  get ref() {
    return 'embedded'
  }

  get typeDef() {
    return {is: 'type'}
  }

  get schema() {
    return this.value
  }

  resolveNested() {
    this.properties
      ? resolveSchema(this.schema, this.config, this.built)
      : this.error(`${this.key}: missing object properties`)
    return this
  }
}

module.exports = {
  toObject,
  MappingObject
}
