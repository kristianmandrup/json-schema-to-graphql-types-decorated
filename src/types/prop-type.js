module.exports = class PropType {
  constructor({configType, baseType, required, decorators}) {
    this.configType = configType
    this.baseType = baseType
    this.required = required
    this.decorators = decorators
  }

  get shape() {
    return {
      type: {
        basic: this.type,
        full: this.dataType,
        fullDecorated: `${this.dataType}${this.decorators.pretty}`
      }
    }
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
    return this.configType || this.baseType
  }
}
