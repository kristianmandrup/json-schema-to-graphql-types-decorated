const {resolvers} = require('./types')
const {Base} = require('../../../base')

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
    return true
  }

  validate() {
    this.error('resolve', 'Not a valid schema property')
  }

  resolve() {
    this.validate()
    this.map = Object
      .keys(resolvers)
      .reduce((acc, key) => {
        const resolver = resolvers[key]
        acc[key] = resolver(this.property)
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
    if (!this.dispatcher) 
      this.warn('dispatch', 'missing dispatcher')
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
