const {MappingPrimitive} = require('./primitive')

function isString(type) {
  return type === 'string'
}

function toString(obj) {
  return isString(obj.type) && MappingString.create(obj)
}

class MappingString extends MappingPrimitive {
  get baseType() {
    return this._types.string || 'String'
  }

  static create(obj) {
    return new MappingString(obj)
  }
}

module.exports = {
  toString,
  MappingString
}
