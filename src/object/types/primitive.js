const {MappingBaseType} = require('./base')

class MappingPrimitive extends MappingBaseType {
  get is() {
    return 'primitive'
  }
}

module.exports = {
  MappingPrimitive
}
