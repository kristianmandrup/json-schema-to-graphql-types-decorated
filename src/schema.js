const {object, utils} = require('./object')

class Schema {
  constructor(schema) {
    this.schema = schema
  }

  validate() {
    const {type, properties} = this.schema
    !type === 'object' && this.error('schema', 'must be of type object')
    !utils.isObjectType(properties) && this.error('invalid schema: must be of type object with properties')
  }

  resolve(schema, config = {}, built = {}) {
    validateSchema(schema)
    object.resolve({schema.properties, config, built})
  }
}

module.exports = {
  resolveSchema
}
