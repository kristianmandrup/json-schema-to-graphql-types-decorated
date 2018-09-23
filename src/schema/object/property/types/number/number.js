const {PrimitiveType} = require('../primitive')

function isInteger(property) {
  return property.type === 'integer'
}

function isNumber(property) {
  return property.type === 'number' || isInteger(property)
}

function resolve({property, config}) {
  return isNumber(property) && NumberType.create({property, config})
}

class NumberType extends PrimitiveType {
  get defaultType() {
    return 'number'
  }

  get kind() {
    return isInteger(this.type)
      ? 'integer'
      : this.defaultType
  }

  get baseType() {
    return this._type === 'number'
      ? 'float'
      : 'int'
  }

  get refTypeName() {
    const type = this._baseType
    const key = type.toLowerCase()
    const custom = this._types[key]
    return custom || type
  }

  static create(obj) {
    return new NumberType(obj)
  }
}

module.exports = {
  isNumber,
  resolve,
  NumberType
}
