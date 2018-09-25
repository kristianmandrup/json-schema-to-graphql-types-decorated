// const {BaseType} = require('../base')
const {PrimitiveType} = require('../primitive')
const {ItemsResolver} = require('./items')
// const {isObjectType} = require('../utils')

function isArray(property) {
  // items can be resolved via external $ref ??
  return property.type === 'array' // && isObjectType(obj.items)
}

function resolve({property, config}) {
  return isArray(property) && ArrayType.create({property, config})
}

class ArrayType extends PrimitiveType {
  constructor({property, config}) {
    super({property, config})
    this.items = this.items || []
    this.resolveTypes()
  }

  static create(obj) {
    return new ArrayType(obj)
  }

  get itemsResolver() {
    return new ItemsResolver({items: this.items})
  }

  get typeName() {
    return this.hasSingleType
      ? this.firstTypeName
      : this.unionTypeName
  }

  get firstTypeName() {
    return this.typeNames[0]
  }

  get hasSingleType() {
    return this.typeNameCount === 1
  }

  get hasMultipleTypes() {
    return this.typeNameCount > 1
  }

  get typeNameCount() {
    return this.typeNames.length
  }

  get unionTypeName() {
    return this.fullClassName
      ? `${this.fullClassName}Item`
      : this.firstTypeName
  }

  get typeNames() {
    this._typeNames = this._typeNames || this
      .itemsResolver
      .resolve()
    return this._typeNames
  }

  get collection() {
    return true
  }

  get list() {
    return true
  }

  get valid() {
    return Array.isArray(this.items)
  }

  resolveTypes() {
    this.onTypes(...this.typeNames)
    return this
  }

  // dispatcher decides how to handle new array types
  onTypes(...types) {
    const payload = this.createPayload({types: types})
    this.dispatch({payload})
    types.map(type => this.onType(type))
  }

  // dispatcher decides how to handle each new array type
  onType(type) {
    const payload = this.createPayload({type: type})
    this.dispatch({payload})
  }

  createPayload(payload = {}) {
    return {
      ...payload,
      shape: this.shape,
      type: this.expandedType
    }
  }
}

module.exports = {
  isArray,
  resolve,
  ArrayType
}
