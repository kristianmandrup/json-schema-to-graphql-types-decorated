const {BaseType} = require('../base')

class PrimitiveType extends BaseType {
  get category() {
    return 'primitive'
  }
}

module.exports = {
  PrimitiveType
}
