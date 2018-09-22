class SchemaEntryError extends Error {}
class SchemaEntry {
  constructor(obj) {
    const {
      name,
      key,
      value,
      type,
      config,
      built
    } = obj
    const $type = type || value.type
    this.obj = obj
    this.obj.type = $type
    this.type = $type
    console.log({$type})
    this.types = {
      string: toString,
      number: toNumber,
      boolean: toBoolean,
      array: toArray,
      object: toObject,
      date: toDate
    }
  }

  isValidSchema() {
    return typeof this.type === 'string'
  }

  error(msg) {
    throw new SchemaEntryError(msg)
  }

  toEntry() {
    if (!this.isValidSchema()) 
      this.error('Not a valid schema')
    const map = {
      array: this.array(),
      object: this.object(),
      enum: this.enum(),
      date: this.date(),
      string: this.string(),
      number: this.number(),
      boolean: this.boolean()
    }
    console.log({map})

    const prim = map.array || map.date || map.string || map.number
    let primitive = (prim || {}).shape
    const type = (map.object || {}).shape
    const $enum = (map.enum || {}).shape
    if ($enum && primitive) {
      primitive = undefined
    }
    return {$enum, primitive, type}
  }

  string(config) {
    return toString(config || this.obj)
  }

  number(config) {
    return toNumber(config || this.obj)
  }

  boolean(config) {
    return toBoolean(config || this.obj)
  }

  enum(config) {
    return toEnum(config || this.obj)
  }

  array(config) {
    return toArray(config || this.obj)
  }

  object(config) {
    return toObject(config || this.obj)
  }

  date(config) {
    return toDate(config || this.obj)
  }

  mixed(config) {
    return toMixed(config || this.obj)
  }
}

module.exports = {
  SchemaEntryError,
  SchemaEntry
}

const {
  toString,
  toNumber,
  toBoolean,
  toArray,
  toObject,
  toDate,
  toEnum
} = require('./types')
