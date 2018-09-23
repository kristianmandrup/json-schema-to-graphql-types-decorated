const {object, utils} = require('./object')
const {Base} = require('../base')

const createSchema = ({schema, config}) => {
  return new Schema({schema, config})
}

class Schema extends Base {
  constructor({schema, config}) {
    this.schema = schema
    this.type = schema
    this.properties = schema
    this.config = config || {}
  }

  get isObject() {
    return this.type === 'object'
  }

  validateType() {
    !this.isObject && this.error('schema', 'must have type: object')
    return true
  }

  get hasPropertiesObject() {
    utils.isObjectType(this.properties)
  }

  validateProperties() {
    !this.hasPropertiesObject && this.error('schema', 'must have a properties object')
    return true
  }

  validate() {
    return this.validateType() && this.validateProperties()
  }

  resolve() {
    return this.validate() && object.resolve({properties: this.properties, config})
  }
}

module.exports = {
  createSchema,
  Schema
}
