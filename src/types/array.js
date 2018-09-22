const {MappingBaseType} = require('./base')

function isObjectType(obj) {
  return obj === Object(obj);
}

function isArray(obj) {
  return obj.type === 'array' // && isObject(obj.items)
}

function toArray(obj) {
  return isArray(obj) && MappingArray
    .create(obj)
    .resolveNested()
    .shape
}

class MappingArray extends MappingBaseType {
  get baseType() {
    return this._type
  }

  get is() {
    return 'type-ref'
  }

  // TODO: how to determine this?
  get ref() {
    return 'embedded'
  }

  get definition() {
    return this.type
  }

  get multiple() {
    return true
  }

  constructor(obj) {
    super(obj)
    this.items = this.value.items
    this._type = this.items.type
  }

  // TODO
  resolveNested() {
    return this
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
