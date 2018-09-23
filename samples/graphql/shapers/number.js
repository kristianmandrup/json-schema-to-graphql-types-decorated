class NumberShaper {
  constructor(shape) {
    this.shape = shape
  }

  reshape() {
    return {
      ...this.shape,
      type: this._baseType
    }
  }

  get _baseType() {
    if (this.value.format === 'float') 
      return 'Float'

    return this._type === 'number'
      ? 'Float'
      : 'Int'
  }
}

module.exports = {
  NumberShaper
}
