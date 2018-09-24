const {PrimitiveType} = require('../primitive')
const {isDate} = require('./utils')
const {camelize} = require('../utils')

function resolve({property, config}) {
  return isDate(property) && DateType.create({property, config})
}

class DateType extends PrimitiveType {
  get kind() {
    return 'date'
  }

  get resolvedTypeName() {
    return camelize(this._types.date || 'Date')
  }

  static create(obj) {
    return new DateType(obj)
  }
}

module.exports = {
  resolve,
  isDate,
  DateType
}
