class ConvertMappingSchemaError extends Error {}
const Decorators = require('./Decorators')
const PropType = require('./prop-type')

class MappingBaseType {
  constructor({
    name,
    key,
    type,
    value,
    config,
    built
  }) {
    this.key = key
    this.clazz = name
    this._type = type
    this.value = value
    this.format = value.format
    this.required = value.required
    this.config = config
    this.built = built
    const $graphql = this.value.graphql || {}
    const ownDecorators = $graphql.decorators || $graphql
    const decorators = config.decorators || {}
    this.classDecorators = (decorators[type] || {})[key]
    this.propDecorators = decorators[key]
    this._decorators = ownDecorators || this.classDecorators || this.propDecorators
    this._meta = this.config._meta_ || {}
    this._types = this._meta.types || {}

    if (value.generated) {
      this._specialType = 'ID!'
    }

    this.type = this.createPropType()
  }

  get valid() {
    return true
  }

  get shape() {
    const shape = {
      name: this.name,
      is: this.is,
      decorators: this.decorators,
      type: this.type,
      pretty: this.pretty
    }
    if (this.required) {
      shape.required = this.required
    }

    if (this.multiple) {
      shape.multiple = this.multiple
    }

    if (this.ref) {
      shape.ref = this.ref
    }
  }

  get ref() {
    return undefined
  }

  get multiple() {
    return false
  }

  get name() {
    return this.key
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

  createPropType() {
    return new PropType({configType: this.configType, baseType: this.baseType, required: this.required})
  }

  get $decorators() {
    this.decs = this.decs || new Decorators(this._decorators)
    return this.decs
  }

  get decorators() {
    const $decorators = this.$decorators
    return {keys: $decorators.keys, validKeys: this.$decorators.goodKeys, pretty: $decorators.pretty}
  }

  toString() {
    return `${this.name}: ${this.type.fullDecorated}`
  }

  get pretty() {
    return this.toString()
  }

  traverseNested() {
    return this
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
