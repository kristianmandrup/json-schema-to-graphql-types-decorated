const {PropertyResolver} = require('../../../property-entity')

class ItemsResolver {
  constructor({items, config}) {
    this.items = items
    this.config = config
  }

  resolve() {
    return this
      .items
      .map(this.typeResolver.bind(this))
  }

  resolveItem(item) {
    return this
      .typeResolver(item)
      .resolve()
      .resolvedTypeName
  }

  get typeResolver(item) {
    return new PropertyResolver({property: item, config: this.config}).resolve()
  }
}

module.exports = {
  ItemsResolver
}
