const {isDate} = require('../date')

class ArrayRefType {
  get typeMap() {
    return {integer: 'Int', 'date-time': 'Date', boolean: 'Bool', number: 'Float'}
  }

  normalizeType(typeName) {
    return this.typeMap[typeName.toLowerCase()] || typeName
  }

  get refType() {
    if (!this.valid) {
      const msg = 'items. Must be an array of valid type definitions for the property'
      this.error('Array', `Invalid ${msg}`)
    }
    return camelize(this.normalizeType(this._refType))
  }

  get _refType() {
    return this.reference
      ? this.resolveRefName
      : this._itemType
  }

  get _itemType() {
    return this.items
      ? this.resolveItemType
      : 'string'
  }

  get reference() {
    return this.item.$ref
  }

  get item() {
    return this.items[0]
  }

  get resolveItemType() {
    return this.resolveSimpleItemType || this.resolveRefName || this.error('Unable to resolve type of array')
  }

  get resolveSimpleItemType() {
    let type = this.item.type
    if (isDate(type)) {
      type = 'date'
    }
    return typeof type === 'string'
      ? type
      : type.name
  }
}

module.exports = {
  ArrayRefType
}
