const {MappingBaseType} = require('./base')

// TODO
function isEnum(obj) {
  return Array.isArray(obj.enum)
}

function toEnum(obj) {
  return isEnum(obj) && MappingEnum
    .create(obj)
    .convert()
}

// TODO
class MappingEnum extends MappingBaseType {
  get baseType() {
    return this.key
  }

  static create(obj) {
    return new MappingEnum(obj)
  }

  get parts() {
    return {
      prop: this.toString(),
      enum: this.toEnum()
    }
  }

  toEnum() {
    return `enum ${this
      .key} {\n  ${this
      .toEnumList()}\n}\n`
  }

  toEnumList() {
    return this
      .value
      .enum
      .map(val => val)
      .join('\n  ')
  }
}

module.exports = {
  toEnum,
  MappingEnum
}
