const {BaseType} = require('../base')
const {camelize} = require('../utils')
const {Nested} = require('./nested')

// no reason to test for properties, as we might be using $ref instead
function isObject(property) {
  return property.type === 'object'
}

function resolve({property, config}) {
  return isObject(property) && ObjectType
    .create({property, config})
    .resolveNested()
}

// Allow recursive schema
class ObjectType extends BaseType {
  constructor(property, config) {
    super(property, config)
    this.properties = this.value.properties
  }

  get shape() {
    return {
      ...super.shape,
      nested: this.nested
    }
  }

  get kind() {
    return 'object'
  }

  get defaultType() {
    return 'Object'
  }

  get resolvedTypeName() {
    const name = this.refTypeName || this.name || this.fullName
    return name && camelize(name) || this.defaultType
  }

  static create(obj) {
    return new ObjectType(obj)
  }

  get category() {
    return 'class'
  }

  get collection() {
    return true
  }

  get dictionary() {
    return true
  }

  resolveNested() {
    if (!this.valid) 
      return this
    const nested = new Nested({value: this.value})
    this.nested = nested.resolve()
    return this
  }

  get valid() {
    return this.properties || this.reference
      ? true
      : false
  }
}

module.exports = {
  isObject,
  resolve,
  ObjectType
}
