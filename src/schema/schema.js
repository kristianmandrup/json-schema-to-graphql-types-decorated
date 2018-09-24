const {resolve} = require('./object')
const {Base} = require('../base')

const createSchema = ({schema, config}) => {
  return new Schema({schema, config})
}

class Schema extends Base {
  constructor({schema, config}) {
    this.schema = schema
    this.properties = schema.properties
  }

  resolve() {
    resolve({schema: this.schema, config: this.config})
  }
}

module.exports = {
  createSchema,
  Schema
}
