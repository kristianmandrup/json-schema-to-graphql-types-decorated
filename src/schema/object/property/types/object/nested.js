class Nested {
  constructor({valid, value}) {
    this.valid = valid
    this.value = value
  }

  resolve() {
    !this.resolveObject && this.error('resolve', 'missing resolveObject')
    this.nested = this.resolveObject({value: this.value, config: this.config})
    return this
  }
}

module.exports = {
  Nested
}
