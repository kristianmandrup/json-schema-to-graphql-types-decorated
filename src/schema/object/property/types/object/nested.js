class Nested {
  constructor({valid}) {
    this.valid = valid
  }

  resolve() {
    this.valid
      ? this.resolveNested()
      : this.noResolve()
    return this
  }

  noResolve() {
    // this.error(`${this.key}: missing object properties`)
  }

  resolveNested() {
    !this.resolveObject && this.error('resolve', 'missing resolveObject')
    this.nested = this.resolveObject({schema: this.objectValue, config: this.config})
    return this
  }
}

module.exports = {
  Nested
}
