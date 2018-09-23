const {PrimitiveType} = require('../primitive')

function isBoolean(property) {
  return property.type === 'boolean'
}

function resolve({property, config}) {
  return isBoolean(property) && BooleanType.create({property, config})
}

class BooleanType extends PrimitiveType {
  get baseType() {
    return 'Boolean'
  }

  static create(obj) {
    return new BooleanType(obj)
  }
}

module.exports = {
  resolve,
  BooleanType
}
