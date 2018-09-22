class ConvertMappingSchemaError extends Error {}
const Decorators = require('./Decorators')
const PropType = require('./prop-type')

class MappingBaseType {
  constructor(configuration) {
    const {
      name,
      key,
      type,
      value,
      config,
      built
    } = configuration
    this.configuration = configuration
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
  }

  get type() {
    return this
      .createPropType()
      .shape
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
      pretty: this.pretty,
      valid: Boolean(this.valid),
      required: Boolean(this.required),
      multiple: Boolean(this.multiple)
    }

    if (this.ref) {
      shape.ref = this.ref
    }
    return shape
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

  get configType() {
    return this._types[this.name]
  }

  get overrideType() {
    return this.configType || this._specialType
  }

  createPropType() {
    return new PropType({overrideType: this.overrideType, baseType: this.baseType, decorators: this.decorators, required: this.required})
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
