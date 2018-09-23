const {MappingPrimitive} = require('./primitive')

function isInteger(type) {
  return type === 'integer'
}

function isNumber(type) {
  return type === 'number' || isInteger(type)
}

function toNumber(obj) {
  return isNumber(obj.type) && MappingNumber.create(obj)
}

class MappingNumber extends MappingPrimitive {
  get baseType() {
    const type = this._baseType
    const key = type.toLowerCase()
    const custom = this._types[key]
    return custom || type
  }

  get _baseType() {
    if (this.value.format === 'float') 
      return 'Float'

    return this._type === 'number'
      ? 'Float'
      : 'Int'
  }

  static create(obj) {
    return new MappingNumber(obj)
  }
}

module.exports = {
  toNumber,
  MappingNumber
}
