const {PrimitiveType} = require('../primitive')

function isString(property) {
  return property.type === 'string'
}

const resolve = ({property, config}) => {
  return isString(property) && StringType.create({property, config})
}

class StringType extends PrimitiveType {
  get defaultType() {
    return 'String'
  }

  get baseType() {
    return this._types.string || this.defaultType
  }

  static create(obj) {
    return new StringType(obj)
  }
}

module.exports = {
  resolve,
  isString,
  StringType
}
