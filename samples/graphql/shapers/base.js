const {BaseType} = require('../../schema/object/property/types').classes

class GraphQlReshaper {
  constructor(shape) {
    this.shape = shape
  }

  extractMeta() {
    if (this.shape.generated) {
      this._specialType = 'ID!'
    }
  }

  get shape() {
    return {
      ...this.shape,
      decorators: this.decorators
    }
  }

  get $decorators() {
    this.decs = this.decs || new Decorators(this._decorators)
    return this.decs
  }

  get decorators() {
    const $decorators = this.$decorators
    return {keys: $decorators.keys, validKeys: this.$decorators.goodKeys, pretty: $decorators.pretty}
  }
}
