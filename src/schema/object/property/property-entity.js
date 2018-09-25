const {resolvers} = require('./types')
const {Base} = require('../../../base')
const {isObjectType, isFunctionType, assignAt} = require('../../../utils')

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
        const resolved = resolver({property: this.property, config: this.config})
        const resultKey = resolved
          ? resolved.category
          : undefined
        resolved && assignAt(acc, resultKey, this.shapeResolved(resolved))
        return acc
      }, {})

    const entity = this.selectEntity(this.map)
    this.onEntity(entity)
    return entity
  }

  shapeResolved(resolved) {
    return resolved.shape.resolvedTypeName
  }

  selectEntity(map) {
    if (map.primitive && map.enum) {
      return map.enum
    }
    const values = Object.values(map)
    const keys = Object.keys(map)
    return values.length === 1
      ? values[0]
      : this.onSelectConflict({map, values, keys})
  }

  onSelectConflict({map, values, keys}) {
    values.length === 0
      ? this.error('selectEntity', `no resolver result`)
      : this.error('selectEntity', `conflicting result: ${keys.join(', ')}`)
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
}

module.exports = {
  createPropertyEntityResolver,
  PropertyEntityResolver
}
