const {MappingBaseType} = require('./base')

// TODO
function isEnum(obj) {
  return Array.isArray(obj.value.enum)
}

function toEnum(obj) {
  return isEnum(obj) && MappingEnum.create(obj)
}

// TODO
class MappingEnum extends MappingBaseType {
  get baseType() {
    return this.key
  }

  get is() {
    return 'enum-ref'
  }

  static create(obj) {
    return new MappingEnum(obj)
  }

  get shape() {
    return {
      ...super.shape,
      values: this.values
    }
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
      .values
      .join('\n  ')
  }

  get values() {
    return this
      .value
      .enum
      .map(val => val)
  }
}

module.exports = {
  toEnum,
  MappingEnum
}
