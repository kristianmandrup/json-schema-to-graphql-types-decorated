const {Base} = require('../../base')
const {camelize} = require('./utils')
const {createPropertiesResolver} = require('./properties')

const createSchemaObject = ({schema, value, config, opts}) => {
  return new SchemaObject({schema, value, config, opts})
}

const resolve = ({schema, value, config, opts}) => {
  return createSchemaObject({schema, value, config, opts}).resolve()
}

class SchemaObject extends Base {
  constructor({schema, value, config, opts}) {
    this.schema = schema
    this.value = value
    const $schema = schema || value
    this.config = config
    this.opts = opts || {}
    this.type = $schema.type
    this.properties = $schema.properties
    this.required = $schema.required || []
    this.definitions = $schema.definitions

    if (this.isSchema) {
      this.config.$schemaRef = $schema
    }
  }

  get schemaType() {
    return this.isSchema
      ? 'schema'
      : 'object'
  }

  get hasPropertiesObject() {
    return utils.isObjectType(this.properties)
  }

  get isObject() {
    return this.type === 'object'
  }

  validateType() {
    !this.isObject && this.error('schema', 'must have type: object')
    return true
  }

  validateProperties() {
    !this.hasPropertiesObject && this.error(this.schemaType, 'must have a properties object')
    return true
  }

  validate() {
    return this.validateProperties() && this.validateType()
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
    const resolver = createPropertiesResolver({object, config})
    return resolver.resolve()
  }

  normalize() {
    this.shouldNormalize() && this.normalizeProps()
  }

  // if schema is received via value, we must assume it comes from a recursive
  // object resolve
  get shouldNormalize() {
    return this.isSchema
  }

  get isSchema() {
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
  resolve,
  createSchemaObject,
  SchemaObject
}
