const {MappingPrimitive} = require('./primitive')

function isBoolean(type) {
  return type === 'boolean'
}

function toBoolean(obj) {
  console.log(obj)
  return isBoolean(obj.type) && MappingBoolean.create(obj)
}

class MappingBoolean extends MappingPrimitive {
  get baseType() {
    return 'Boolean'
  }

  static create(obj) {
    return new MappingBoolean(obj)
  }
}

module.exports = {
  toBoolean,
  MappingBoolean
}
