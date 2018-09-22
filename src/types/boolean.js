const {MappingPrimitive} = require('./primitive')

function isBoolean(type) {
  return type === 'boolean'
}

function toBoolean(obj) {
  return isBoolean(obj.type) && MappingBoolean
    .create(obj)
    .shape
}

class MappingBoolean extends MappingPrimitive {
  get baseType() {
    return 'boolean'
  }

  static create(obj) {
    return new MappingBoolean(obj)
  }
}

module.exports = {
  toBoolean,
  MappingBoolean
}
