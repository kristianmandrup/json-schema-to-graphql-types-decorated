const {Base} = require('../../base')
const {property: {
    createProperty
  }} = require('./property')

const createProperties = ({object, config}) => {
  return new PropertiesResolver({object, config})
}

class PropertiesResolver extends Base {
  constructor({object, config}) {
    const {ownerName, properties} = object
    this.ownerName = ownerName
    this.properties = properties
    this.config = config
  }

  resolve() {
    const {properties} = this
    return Object
      .keys(this.properties)
      .reduce((acc, key) => {
        const property = properties[key]
        property.ownerName = this.ownerName
        property.key = key
        acc[key] = createProperty({property, config: this.config})
        return acc
      }, {})
  }
}
module.exports = {
  PropertiesResolver
}
