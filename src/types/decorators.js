function isObject(obj) {
  return obj === Object(obj);
}

module.exports = class Decorators {
  constructor(decorators = {}, config = {}) {
    this.decorators = decorators
    this.keys = Object.keys(this.decorators)
    this.validKeys = config.validKeys || []
  }

  // TODO: filter only good keys
  get config() {
    return this.decorators
  }

  hasProps(props) {
    return isObject(props) && Object
      .keys(props)
      .length > 0
  }

  get hasAny() {
    return this.keys.length > 0
  }

  get hasAnyValid() {
    return this.hasAny && this.hasValidKeys
  }

  get goodKeys() {
    if (!this.hasAnyValid) {
      return []
    }
    return this
      .keys
      .filter(key => this.validKeys.indexOf(key) >= 0)
  }

  get hasValidKeys() {
    if (!this.validKeys || this.validKeys.length === 0) 
      return true
    return !hasInvalidKey
  }

  get hasInvalidKey() {
    return this
      .keys
      .find(key => !this.validKeys.indexOf(key) >= 0)
  }

  get pretty() {
    return this.hasValidKeys
      ? ' ' + this.toString()
      : ''
  }

  toString() {
    const decs = this
      .keys
      .map(key => {
        const props = this.decorators[key]
        return `@${key}${this.propsToString(props)}`
      })
    if (decs.length == 0) 
      return ''
    return decs.length > 1
      ? decs.join(' ')
      : decs[0]
  }

  propsToString(props = {}) {
    return this.hasProps(props)
      ? `(${this._propsToString(props)})`
      : ''
  }

  _propsToString(props = {}) {
    const keys = Object.keys(props)
    return keys.map(key => {
      const value = props[key]
      return `${key}: ${this._valueToStr(value)}`
    })
  }

  _valueToStr(value) {
    if (value === 'true' || value === 'false') 
      return value
    if (!isNaN(value)) 
      return value
    return `"${value}"`
  }
}
