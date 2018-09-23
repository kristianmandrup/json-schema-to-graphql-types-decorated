const {BaseType} = require('../base')
const {ArrayTypeRefs} = require('./type-refs')
// const {isObjectType} = require('../utils')

function isArray(property) {
  // items can be resolved via external $ref ??
  return property.type === 'array' && isObjectType(obj.items)
}

function resolve({property, config}) {
  return isArray(property) && ArrayType.create({property, config})
}

class ArrayType extends BaseType {
  constructor({property, config}) {
    super({property, config})
    this.items = this.value.items
    this._type = this.items.type
    this.resolveNested()
    this.arrayTypeRefs = new ArrayTypeRefs({items})
  }

  get kind() {
    return 'array'
  }

  get refTypeNames() {
    return this.arrRefType.resolved
  }

  // pick the first! (default strategy)
  get refTypeName() {
    return this.refTypeNames[0]
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

  resolveTypeRefs() {
    const typeRefs = this
      .arrayTypeRefs
      .resolve()
    this.onTypeRefs(...typeRefs)
    return this
  }

  onTypeRefs(...typeRefs) {
    typeRefs.map(typeRef => this.onTypeRefs(typeRef))
  }

  onTypeRef(typeRef) {
    this
      .state
      .addRef(this, typeRef, {refType: this.refType})
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
