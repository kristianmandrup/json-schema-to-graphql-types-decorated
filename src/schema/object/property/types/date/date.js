const {PrimitiveType} = require('../primitive')
const {isDate} = require('./utils')

function resolve(obj) {
  return isDate(obj) && DateType.create(obj)
}

class DateType extends PrimitiveType {
  get kind() {
    return 'date'
  }

  get propTypeName() {
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
