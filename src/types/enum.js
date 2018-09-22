const {MappingBaseType} = require('./base')

// TODO
function isEnum(obj) {
  return false
}

function toEnum(obj) {
  return isEnum(obj) && MappingEnum
    .create(obj)
    .convert()
}

// TODO
class MappingEnum extends MappingBaseType {
  get baseType() {
    return 'enum'
  }

  static create(obj) {
    return new MappingEnum(obj)
  }
}

module.exports = {
  toEnum,
  MappingEnum
}
