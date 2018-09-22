const {SchemaEntry} = require('./entry');

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
        enums: [],
        types: []
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

function propsToOutput(obj) {
  const props = []
  const enums = []
  const types = []
  const {properties} = obj

  Object
    .keys(properties)
    .map((key) => {
      const value = properties[key]
      const entry = propToSchemaEntry({
        value,
        ...obj
      })
      entry.primitive && props.push(entry.primitive)
      entry.enum && enums.push(entry.enum)
      entry.type && types.push(entry.type)
    })

  return {props, enums, types}
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

function propToSchemaEntry(obj) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry
  return entryBuilder(obj)
}

function createSchemaEntry(obj) {
  return new SchemaEntry(obj).toEntry()
}

module.exports = {
  resolveSchema,
  createSchemaEntry
}
