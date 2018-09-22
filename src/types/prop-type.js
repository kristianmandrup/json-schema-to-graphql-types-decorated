class PropType {
  constructor({overrideType, baseType, required, decorators}) {
    this.overrideType = overrideType
    this.baseType = baseType
    this.required = required
    this.decoration = decorators
      ? decorators.pretty
      : ''
  }

  get shape() {
    return {basic: this.type, full: this.full, fullDecorated: this.fullDecorated}
  }

  get full() {
    return this.dataType
  }

  get fullDecorated() {
    return `${this
      .dataType}${this
      .decoration}`
      .trim()
  }

  get req() {
    return this.required
      ? '!'
      : ''
  }

  get dataType() {
    return this._normalizedDataType
  }

  get _normalizedDataType() {
    return this
      ._dataType
      .replace('!!', '!')
  }

  get _dataType() {
    return [this.type, this.req].join('')
  }

  get type() {
    return this.overrideType || this.baseType
  }
}

module.exports = {
  PropType
}
