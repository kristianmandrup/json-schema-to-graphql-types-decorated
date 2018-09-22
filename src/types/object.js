const {MappingBaseType} = require('./base')

const {$buildTypes} = require('../')

function isObject(obj) {
  return obj === Object(obj);
}

function toObject(obj) {
  return isObject(obj.type) && MappingObject
    .create(obj)
    .convert()
}

// Allow recursive schema
class MappingObject extends MappingBaseType {
  constructor(obj) {
    super(obj)
    this.properties = this.value.properties
  }

  convert() {
    return this.properties
      ? $buildTypes(this.value, this.config)
      : this.error(`${this.key}: missing object properties`)
  }
}

module.exports = {
  toObject,
  MappingObject
}
