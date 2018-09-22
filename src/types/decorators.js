function isObject(obj) {
  return obj === Object(obj);
}

module.exports = class Decorators {
  constructor(decorators = {}) {
    this.decorators = decorators
  }

  hasProps(props) {
    return isObject(props) && Object
      .keys(props)
      .length > 0
  }

  toString() {
    const keys = Object.keys(this.decorators)
    const decs = keys.map(key => {
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
