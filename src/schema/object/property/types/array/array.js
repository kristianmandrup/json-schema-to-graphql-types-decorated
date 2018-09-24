const {BaseType} = require('../base')
const {ItemsResolver} = require('./items')
// const {isObjectType} = require('../utils')

function isArray(property) {
  // items can be resolved via external $ref ??
  return property.type === 'array' // && isObjectType(obj.items)
}

function resolve({property, config}) {
  return isArray(property) && ArrayType.create({property, config})
}

class ArrayType extends BaseType {
  constructor({property, config}) {
    super({property, config})
    this.items = this.items || []
    this.resolveTypeRefs()
  }

  get itemsResolver() {
    return new ItemsResolver({items: this.items})
  }

  get kind() {
    return 'array'
  }

  get refTypeName() {
    console.log('refTypeName', {refTypeNames: this.refTypeNames})
    this.refTypeNames.length === 1
      ? `${this.fullClassName}Item`
      : this.unionTypeName
  }

  get unionTypeName() {
    return this.refTypeNames[0]
  }

  get refTypeNames() {
    return this
      .itemsResolver
      .resolve()
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
    const typeRefs = this.refTypeNames
    this.onTypeRefs(...typeRefs)
    return this
  }

  // dispatcher can then decide to add typeRefs as Union type as well as adding
  // edges etc.
  onTypeRefs(...typeRefs) {
    const payload = {
      typeRefs: typeRefs,
      refTypeName: this.refTypeName,
      union: true,
      array: true
    }

    this.dispatch({payload})
    typeRefs.map(typeRef => this.onTypeRefs(typeRef))
  }

  onTypeRef(typeRef) {
    const payload = {
      ...typeRef,
      refType: this.refType,
      array: true
    }
    // dispatcher can then decide to add typeRefs as Union type as well as adding
    // edges etc.
    this.dispatch({payload})
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
