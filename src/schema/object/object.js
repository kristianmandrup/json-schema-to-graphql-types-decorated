const {normalizeRequired} = require('./normalize')
const {camelize} = require('./utils')
const {property: {
    createProperty
  }} = require('./property')

class SchemaObject extends Base {
  constructor({schema, config}) {
    this.schema = schema
    this.config = config
    this.properties = schema.properties
    this.required = schema.required || []
    this.definitions = schema.definitions
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
    this.validate()
    const name = camelize(schema.title || schema.name)
    this.normalizeProps()
    const {name, value} = this.properties
    const property = {
      name,
      key: name,
      type,
      value
    }
    const property = createProperty({property, config})
    return property.resolve()
  }

  normalizeProps() {
    this.properties = Object
      .keys(this.properties)
      .reduce(this.normalize.bind(this), {})
  }

  normalize(acc, key) {
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
