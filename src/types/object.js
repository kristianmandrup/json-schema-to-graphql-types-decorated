const {MappingBaseType} = require('./base')

const {buildMapping} = require('../')

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
      ? buildMapping(this.value, this.config, false)
      : this.error(`${this.key}: missing object properties`)
  }
}

module.exports = {
  toObject,
  MappingObject
}
