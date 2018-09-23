const {BaseType} = require('../base')
const {camelize, isObjectType} = require('../utils')

function isArray(property) {
  return property.type === 'array' // && isObjectType(obj.items)
}

function resolve({property, config}) {
  return isArray(property) && ArrayType.create({property, config})
}

class ArrayType extends BaseType {
  constructor({property, config}) {
    super({property, config})
    this.resolveNested()
  }

  get kind() {
    return 'array'
  }

  get refTypeName() {
    return this.refType
  }

  get multiple() {
    return true
  }

  get list() {
    return true
  }

  constructor(obj) {
    super(obj)
    this.items = this.value.items
    this._type = this.items.type
  }

  get valid() {
    return Array.isArray(this.items)
  }

  // TODO
  resolveNested() {
    return this
  }

  static create(obj) {
    return new ArrayType(obj)
  }
}

module.exports = {
  isArray,
  resolve,
  ArrayType
}
