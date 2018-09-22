const {MappingBaseType} = require('./base')

function isArray(type) {
  return type === 'array'
}

function toArray(obj) {
  return isArray(obj.type) && MappingArray
    .create(obj)
    .convert()
}

class MappingArray extends MappingBaseType {
  get baseType() {
    return this._type
  }

  constructor(obj) {
    super(obj)
    this.items = this.value.items
    this._type = this.items.type
  }

  static create(obj) {
    return new MappingArray(obj)
  }

  get dataType() {
    return `[${this.type}]${this.req}`
  }
}

module.exports = {
  toArray,
  MappingArray
}
