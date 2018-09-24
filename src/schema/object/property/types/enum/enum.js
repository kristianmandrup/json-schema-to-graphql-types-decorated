const {BaseType} = require('../base')
const {camelize} = require('../utils')

function isEnum(property) {
  return Array.isArray(property.enum)
}

function resolve({property, config}) {
  return isEnum(property) && EnumType.create({property, config})
}

class EnumType extends BaseType {
  get kind() {
    return 'enum'
  }

  get enum() {
    return this.property.enum
  }

  get category() {
    return 'enum'
  }

  get propTypeName() {
    return camelize(this.key)
  }

  static create(property, config) {
    return new EnumType(property, config)
  }

  get shape() {
    return {
      ...super.shape,
      values: this.values
    }
  }

  get values() {
    return this
      .enum
      .map(val => val)
  }
}

module.exports = {
  isEnum,
  resolve,
  EnumType
}
