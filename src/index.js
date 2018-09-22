const {SchemaEntry, SchemaEntryError} = require('./entry');

const defaults = {
  indentFn: (num, newline = true) => {
    const base = newline
      ? '\n'
      : ''
    return base.padEnd(num * 2 - 1)
  }
}

function buildTypes(schema, config = {}, withTypeMarker = true) {
  const typeMarker = withTypeMarker
    ? 'type '
    : ''

  const indent = config.indentFn || defaults.indentFn
  let {type, properties} = schema
  if (isObject(type)) {
    if (properties) {
      const name = schema.title || schema.name
      properties = normalizeRequired(schema)
      config.indent = (config.indent || 0) + 1
      const indentation = config.indent
      config.indentFn = config.createIndent
        ? config.createIndent(config.indent)
        : indent
      const propsOutput = propsToOutput({properties, name, config})
      const postFix = indent(indentation)
      return `${typeMarker}${name} {${propsOutput}${postFix}}\n`
    }
  }
  throw new Error('invalid schema')
}

function isObject(type) {
  return type && type === 'object'
}

function normalizeRequired(schema) {
  const {properties, required} = schema
  return Object
    .keys(properties)
    .reduce((acc, key) => {
      const value = properties[key]
      const isRequired = required.indexOf(key) >= 0
      value.required = value.required || isRequired
      acc[key] = value
      return acc
    }, {})
}

function propsToOutput({
  properties,
  name,
  config = {}
}) {
  const propsList = Object
    .keys(properties)
    .map((key) => {
      const value = properties[key]
      const entry = propToSchemaEntry({name, key, value, config})
      return entry
    })

  const indent = config.indentFn
  const indentation = indent(config.indent + 1)
  return indentation + propsList.join(indentation)
}

function propToSchemaEntry({
  name,
  key,
  value,
  config = {}
}) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry
  return entryBuilder({name, key, value, config})
}

function createSchemaEntry({name, key, value, config}) {
  return new SchemaEntry({name, key, value, config}).toEntry()
}

const types = require('./types')

module.exports = {
  buildTypes,
  createSchemaEntry,
  SchemaEntry,
  SchemaEntryError,
  types
}
