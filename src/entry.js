class SchemaEntryError extends Error {}

class SchemaEntry {
  constructor(obj) {
    const {name, key, value, config, built} = obj
    this.obj = obj
    this.key = key
    this.name = name
    this.value = value
    this.config = config
    this.type = value.type
    this.built = built

    this.types = {
      string: toString,
      number: toNumber,
      boolean: toBoolean,
      array: toArray,
      object: toObject,
      date: toDate,
      mixed: toMixed
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
    const config = this.obj
    const map = {
      array: this.array(config),
      object: this.object(config),
      enum: this.enum(config),
      date: this.date(config),
      string: this.string(config),
      number: this.number(config),
      boolean: this.boolean(config)
    }
    const primitive = map.array || map.date || map.string || map.number
    const type = map.object
    const $enum = map.enum
    return {enum: $enum, primitive, type}
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
  toMixed,
  toDate,
  toEnum
} = require('./types')
