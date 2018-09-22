const {SchemaEntry, SchemaEntryError} = require('./entry');

const defaults = {
  indentFn: (num, newline = true) => {
    const base = newline
      ? '\n'
      : ''
    return base.padEnd(num * 2 - 1)
  }
}

const render = prefix => (body) => `${prefix} ${body}`

const rendered = {}
const built = {
  enums: {},
  types: {}
}

function buildTypes(schema, config = {}) {
  $buildAll(schema, config, built, false)
  rendered.props = built
    .props
    .map(renderType)

  rendered.enums = built
    .props
    .map(render('enum'))

  return [rendered.props, rendered.enums].join('\n')
}

function $buildAll(schema, config = {}, built = {}, inner = true) {
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
      if (propsOutput.props) {
        const postFix = indent(indentation)
        const type = `${name} {${propsOutput.props}${postFix}}\n`

        propsOutput.types[name] = type
      }

      if (propsOutput.enums) {
        propsOutput
          .enums
          .map($enum => {
            built.enums[$enum.name] = $enum
          })
      }
      if (propsOutput.types) {
        propsOutput
          .types
          .map(type => {
            built.types[type.name] = type
          })
      }
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
  const props = []
  const enums = []
  const types = []

  const propsList = Object
    .keys(properties)
    .map((key) => {
      const value = properties[key]
      const entry = propToSchemaEntry({name, key, value, config})
      entry.primitive && props.push(entry.primitive)
      entry.enum && enums.push(entry.enum)
      entry.type && typess.push(entry.type)
    })

  const indent = config.indentFn
  const indentation = indent(config.indent + 1)
  return {
    props: indentation + props.join(indentation),
    enums,
    types
  }
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
  $buildTypes,
  createSchemaEntry,
  SchemaEntry,
  SchemaEntryError,
  types
}
