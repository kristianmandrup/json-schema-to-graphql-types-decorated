const {SchemaEntry} = require('./entry');

const assign = (left, right) => {
  left = right
}

const assignAt = (left) => (at, right) => {
  left[at] = right
}

function createSchemaEntry(obj) {
  return new SchemaEntry(obj).toEntry()
}

function propToSchemaEntry(obj) {
  const entryBuilder = createSchemaEntry || config.createSchemaEntry
  return entryBuilder(obj)
}

const createPropOutputHandler = (obj) => (result, key) => {
  const {properties} = obj
  const value = properties[key]
  console.log('before', {result})
  const entry = propToSchemaEntry({
    value,
    key,
    ...obj
  })
  const {primitive, $enum, type} = entry
  primitive && assignAt(result.props)(primitive.name, primitive)
  $enum && assignAt(result.enums)($enum.name, $enum)
  type && assignAt(result.types)(type.name, type)

  console.log('after', {result})
  return result
}

function propsToOutput(obj) {
  // use dictionaries to avoid duplicates
  const result = {
    props: {},
    enums: {},
    types: {}
  }
  const {properties} = obj
  const propsOutputHandler = createPropOutputHandler(obj)
  return Object
    .keys(properties)
    .reduce(propsOutputHandler, result)
}

module.exports = {
  propsToOutput,
  createPropOutputHandler
}
