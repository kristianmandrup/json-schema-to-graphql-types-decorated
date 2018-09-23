function normalizeRequired(schema) {
  const {properties, required} = schema
  return Object
    .keys(properties)
    .reduce((acc, key) => {
      const value = (properties || {})[key]
      const isRequired = (required || []).indexOf(key) >= 0
      value.required = value.required || isRequired
      acc[key] = value
      return acc
    }, {})
}

module.exports = {
  normalizeRequired
}
