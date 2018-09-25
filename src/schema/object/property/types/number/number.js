const {PrimitiveType} = require('../primitive')
const {checkType} = require('../base')

function isIntegerType(typeName) {
  return typeName === 'integer'
}

function isInteger(property) {
  return checkType(property, 'integer')
}

function isNumber(property) {
  return checkType(property, 'number') || isInteger(property)
}

function resolve({property, config}) {
  return isNumber(property) && NumberType.create({property, config})
}

class NumberType extends PrimitiveType {
  get defaultType() {
    return 'number'
  }

  get kind() {
    return isIntegerType(this.type)
      ? 'integer'
      : this.defaultType
  }

  get baseType() {
    return this._type === 'number'
      ? 'Float'
      : 'Int'
  }

  get refTypeName() {
    const type = this.baseType
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
