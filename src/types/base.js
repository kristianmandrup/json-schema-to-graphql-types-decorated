class ConvertMappingSchemaError extends Error {}
const Decorators = require('./Decorators')

class MappingBaseType {
  constructor({name, key, type, value, config}) {
    this.key = key
    this.clazz = name
    this._type = type
    this.value = value
    this.format = value.format
    this.required = value.required
    this.config = config
    const $graphql = this.value.graphql || {}
    const ownDecorators = $graphql.decorators || $graphql
    const decorators = (config._meta_ || {}).decorators || {}
    this.classDecorators = (decorators[type] || {})[key]
    this.propDecorators = decorators[key]
    this._decorators = ownDecorators || this.classDecorators || this.propDecorators
    this._meta = this.config._meta_ || {}
    this._types = this._meta.types || {}

    if (value.generated) {
      this._specialType = 'ID!'
    }

  }

  get baseType() {
    this.error('default mapping type must be specified by subclass')
  }

  get configEntry() {
    return this.config[this.key] || {}
  }

  get configType() {
    return this.configEntry.type || this._specialType
  }

  get $decorators() {
    return new Decorators(this._decorators).toString()
  }

  get decorators() {
    return this.$decorators
      ? ' ' + this.$decorators
      : ''
  }

  toString() {
    return `${this.key}: ${this.dataType}${this.decorators}`
  }

  get req() {
    return this.required
      ? '!'
      : ''
  }

  get dataType() {
    return this._normalizedDataType
  }

  get _normalizedDataType() {
    return this
      ._dataType
      .replace('!!', '!')
  }

  get _dataType() {
    return [this.type, this.req].join('')
  }

  get type() {
    return this.configType || this.baseType
  }

  convert() {
    return this.toString()
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {}
  }

  errMessage(errKey = 'default') {
    return this.message[errKey] || 'error'
  }

  error(name, msg) {
    const errMSg = `[${name}] ${msg}`
    console.log(errMSg)
    throw new ConvertMappingSchemaError(errMSg)
  }
}

module.exports = {
  MappingBaseType,
  ConvertMappingSchemaError
}
