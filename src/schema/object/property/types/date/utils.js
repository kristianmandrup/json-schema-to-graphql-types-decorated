function hasDateFormat(format) {
  return format === 'date-time'
}

function extractFormat(obj) {
  return obj.format || obj.value.format
}

function isDate(obj) {
  const format = extractFormat(obj)
  return obj.type === 'string' && hasDateFormat(format)
}

module.exports = {
  isDate,
  hasDateFormat
}
