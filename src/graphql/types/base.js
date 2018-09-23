const {BaseType} = require('../../schema/object/property/types').classes

class GraphQlBaseType extends BaseType {
  extractMeta() {
    if (this.value.generated) {
      this._specialType = 'ID!'
    }

    const $graphql = this.value.graphql || {}
    const ownDecorators = $graphql.decorators || $graphql
    const decorators = this.config.decorators || {}
    this.classDecorators = (decorators[type] || {})[key]
    this.propDecorators = decorators[key]
    this._decorators = ownDecorators || this.classDecorators || this.propDecorators
  }

  get shape() {
    return {
      ...super.shape,
      decorators: this.decorators,
      pretty: this.pretty
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
