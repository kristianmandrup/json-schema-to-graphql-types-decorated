const {MappingBaseType} = require('./base')

function hasDateFormat(format) {
  return format === 'date-time'
}

function isDate(obj) {
  const format = obj.format || obj.value.format
  return obj.type === 'string' && hasDateFormat(format)
}

function toDate(obj) {
  return isDate(obj) && MappingDate.create(obj)
}

class MappingDate extends MappingBaseType {
  get baseType() {
    return this._types.date || 'Date'
  }

  get is() {
    return 'scalar'
  }

  static create(obj) {
    return new MappingDate(obj)
  }
}

module.exports = {
  toDate,
  MappingDate
}
