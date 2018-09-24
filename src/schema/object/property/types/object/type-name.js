const {camelize} = require('../utils')

class ObjectTypeNameResolver {
  constructor({object, config}) {
    this.object = object
    this.config = config
  }

  resolve() {
    return this.resolvedTypeName
  }

  get typeName() {
    const {object} = this
    const name = this.resolvedTypeName || object.defaultType
    return camelize(name)
  }

  get resolvedTypeName() {
    const {object} = this
    const {refTypeName, name, fullName} = object
    this._resolvedTypeName = this._resolvedTypeName || (refTypeName || name || fullName)
    return this._resolvedTypeName
  }
}
module.exports = {
  ObjectTypeNameResolver
}
