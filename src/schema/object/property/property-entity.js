const {resolvers} = require('./types')
const {Base} = require('../../../base')
const {isObjectType, isFunctionType} = require('../../../utils')

const createPropertyEntityResolver = ({property, config}) => {
  return new PropertyEntityResolver({property, config})
}

class PropertyEntityResolver extends Base {
  constructor({property, config}) {
    super(config)
    this.property = property
    this.config = config
    // this.state = config.state
    this.dispatcher = config.dispatcher
    this.resolvers = config.resolvers || resolvers
  }

  get sender() {
    return 'propertyEntityResolver'
  }

  isValid() {
    return this.isValidProperty || this.isValidResolvers
  }

  get isValidProperty() {
    return isObjectType(this.property)
  }

  get isValidResolvers() {
    return isObjectType(this.resolvers)
  }

  validate() {
    this.validateResolvers() && this.validateProperty()
  }

  validateResolvers() {
    !this.isValidResolvers && this.error('resolve', 'Invalid resolvers. Must be an object, where each entry is a resolver function')
  }

  validateResolver(resolver, key) {
    !isFunctionType(resolver) && this.error('resolve', `Invalid resolver [${key}]. Must be a function. Was ${typeof resolver}`)
    return true
  }

  validateProperty() {
    !isValidProperty && this.error('resolve', `Invalid property. Must be an object. Was ${typeof this.property}`)
    return true
  }

  resolve() {
    this.validate()
    this.map = Object
      .keys(resolvers)
      .reduce((acc, key) => {
        const resolver = resolvers[key]
        this.validateResolver(resolver, key)
        acc[key] = resolver({property: this.property, config: this.config})
        return acc
      }, {})

    const entity = this.$object || this.$enum || this.$primitive
    this.onEntity(entity)
    return entity
  }

  onEntity(entity) {
    this.dispatch({
      payload: {
        ...entity
      }
    })
  }

  dispatch({payload}) {
    const event = {
      sender: this.sender,
      payload: payload
    }
    if (!this.dispatcher) {
      this.warn('dispatch', 'missing dispatcher')
      return
    }

    this
      .dispatcher
      .dispatch(event)
  }

  get $object() {
    this.object = this.object || (this.map.object || {}).shape
    return this.object && {
      value: this.object,
      type: 'object'
    }
  }

  get $enum() {
    this.enum = this.enum || (this.map.enum || {}).shape
    return this.enum && {
      value: this.enum,
      type: 'enum'
    }
  }

  get $primitive() {
    if (this.$enum) 
      return

    const {array, date, string, number} = this.map
    this.prim = this.prim || (array || date || string || number || {}).shape

    return this.prim && {
      value: this.prim,
      type: 'primitive'
    }
  }
}

module.exports = {
  createPropertyEntityResolver,
  PropertyEntityResolver
}
