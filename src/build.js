const {SchemaEntry, SchemaEntryError} = require('./entry');
const {resolveSchema, createSchemaEntry} = require('./schema')

const defaults = {
  indentFn: (num, newline = true) => {
    const base = newline
      ? '\n'
      : ''
    return base.padEnd(num * 2 - 1)
  }
}

const createRender = prefix => (name, props) => {
  const body = renderNamed({name, props})
  return `${prefix} ${body}`
}

function renderNamed({name, props}) {
  // config.indent = (config.indent || 0) + 1 const indentation = config.indent
  // config.indentFn = config.createIndent   ? config.createIndent(config.indent)
  // : indent
  return `${name} {${props.pretty}}\n`
}

const rendered = {}
const built = {
  enums: {},
  types: {}
}

function buildTypes(schema, config = {}) {
  resolveSchema(schema, config, built, false)

  built.types = built.types || {}
  built.enums = built.enums || {}

  const {types, enums} = built
  const render = {}

  render.types = Object
    .keys(types || {})
    .reduce((acc, name) => {
      const typeProps = types[name]
      acc[name] = createRender('type')(name, typeProps)
      return acc
    }, {})

  render.enums = Object
    .keys(enums || {})
    .reduce((acc, name) => {
      const enumVals = enums[name]
      acc[name] = createRender('enum')(name, enumVals)
      return acc
    }, {})

  return {
    render,
    ...built
  }
}

module.exports = {
  buildTypes,
  resolveSchema,
  createSchemaEntry,
  SchemaEntry,
  SchemaEntryError
}
