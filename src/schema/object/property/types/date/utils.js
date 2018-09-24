function hasDateFormat(format) {
  return format === 'date-time'
}

function extractFormat(obj) {
  return obj.format
}

function isDate(obj) {
  const format = extractFormat(obj)
  return hasDateFormat(format) // && obj.type === 'string'
}

module.exports = {
  isDate,
  hasDateFormat
}
