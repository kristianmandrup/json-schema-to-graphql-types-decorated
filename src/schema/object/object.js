const {Base} = require('../../base')
const {normalizeRequired} = require('./normalize')
const {camelize} = require('./utils')
const {createProperties} = require('./properties')

const createSchemaObject = ({schema, value, config, opts}) => {
  return new SchemaObject({schema, value, config, opts})
}

class SchemaObject extends Base {
  constructor({schema, value, config, opts}) {
    this.schema = schema
    this.value = value
    const $schema = schema || value
    this.config = config
    this.opts = opts || {}
    this.properties = $schema.properties
    this.required = $schema.required || []
    this.definitions = $schema.definitions
  }

  get hasPropertiesObject() {
    utils.isObjectType(this.properties)
  }

  validateProperties() {
    !this.hasPropertiesObject && this.error('schema', 'must have a properties object')
    return true
  }

  validate() {
    return this.validateProperties()
  }

  resolve() {
    const schema = this.$schema
    this.validate()
    const name = camelize(schema.title || schema.name)
    this.normalize()
    const object = {
      ownerName: name,
      properties: this.properties
    }
    const properties = createProperties({object, config})
    return properties.resolve()
  }

  normalize() {
    return this.shouldNormalize() && this.normalizeProps()
  }

  // if schema is received via value, we must assume it comes from a recursive
  // object resolve
  get shouldNormalize() {
    return !this.value
  }

  normalizeProps() {
    this.properties = Object
      .keys(this.properties)
      .reduce(this.normalizeRequired.bind(this), {})
  }

  normalizeRequired(acc, key) {
    const value = this.properties[key]
    const isRequired = this
      .required
      .indexOf(key) >= 0
    value.required = value.required || isRequired
    acc[key] = value
    return acc
  }
}

module.exports = {
  SchemaObject
}
