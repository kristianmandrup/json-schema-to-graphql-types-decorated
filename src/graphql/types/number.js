class GraphQlNumber {
  get _baseType() {
    if (this.value.format === 'float') 
      return 'Float'

    return this._type === 'number'
      ? 'Float'
      : 'Int'
  }
}
