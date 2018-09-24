const {Base} = require('../../base')
const {property} = require('./propert')
const {createPropertyEntityResolver} = property

const createPropertiesResolver = ({object, config}) => {
  return new PropertiesResolver({object, config})
}

class PropertiesResolver extends Base {
  constructor({object, config}) {
    const {ownerName, properties} = object
    this.ownerName = ownerName
    this.properties = properties
    this.config = config
    this.validate()
  }

  validate() {
    !this.ownerName && this.error('validate', 'object is missing required ownerName entry')
    return true
  }

  resolve() {
    return Object
      .keys(this.properties)
      .reduce(this.reduceProp.bind(this), {})
  }

  reduceProp(acc, key) {
    const property = this.prepareProperty(key)
    const propertyEntityResolver = createPropertyEntityResolver({property, config: this.config})
    const entity = propertyEntityResolver.resolve()
    acc[key] = entity
    return acc
  }

  prepareProperty(key) {
    const property = this.properties[key]
    // prepare property object
    property.ownerName = this.ownerName
    property.key = key
    return property
  }
}

module.exports = {
  createPropertiesResolver,
  PropertiesResolver
}
