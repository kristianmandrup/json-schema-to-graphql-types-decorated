const {normalizeRequired} = require('./normalize')
const {camelize} = require('./utils')
const {propsToOutput} = require('./props')

function resolve({properties, config, built}) {
  if (!properties) {}
  const name = camelize(schema.title || schema.name)
  properties = normalizeRequired(schema)
  const propsOutput = propsToOutput({properties, name, config, built})
  return propsOutput
}

module.exports = {
  resolve
}
