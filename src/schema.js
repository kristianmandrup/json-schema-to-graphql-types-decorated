function isObject(type) {
  return type && type === 'object'
}

function resolveSchema(schema, config = {}, built = {}, inner = true) {
  let {type, properties} = schema
  if (isObject(type)) {
    if (properties) {
      const name = schema.title || schema.name
      properties = normalizeRequired(schema)
      const propsOutput = propsToOutput({properties, name, config})
      if (propsOutput.props) {
        propsOutput.types[name] = type
      }

      const result = {
        enums: {},
        types: {}
      }

      if (propsOutput.enums) {
        result.enums = propsOutput
          .enums
          .map($enum => {
            built.enums[$enum.name] = $enum
          })
      }
      if (propsOutput.types) {
        result.types = propsOutput
          .types
          .map(type => {
            built.types[type.name] = type
          })
      }
      return result
    }
  }
  throw new Error('invalid schema: must be an object with properties')
}

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

const {propsToOutput} = require('./props')

module.exports = {
  resolveSchema
}
