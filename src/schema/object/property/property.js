const {resolvers} = require('./types')

const createProperty = ({property, config}) => {
  return new Property({property, config})
}

class Property extends Base {
  constructor({property, config}) {
    const {name, key} = property
    this.property = property
    this.key = key
    this.name = name
    this.types = config.types || defaults.types
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
    return {object: this.$object, enum: this.$enum, primitive: this.$primitive}
  }

  get $object() {
    this.object = this.object || (this.map.object || {}).shape
    return this.object
  }

  get $enum() {
    this.enum = this.enum || (this.map.enum || {}).shape
    return this.enum
  }

  get $primitive() {
    if (this.enumerator) 
      return

    const {array, date, string, number} = this.map
    this.prim = this.prim || (array || date || string || number || {}).shape
    return
  }
}

module.exports = {
  createProperty,
  Property
}
