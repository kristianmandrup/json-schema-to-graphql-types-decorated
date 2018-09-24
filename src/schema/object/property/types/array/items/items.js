const {createPropertyEntityResolver} = require('../../../property-entity')
const {Base} = require('../../../../../../base')

const createItemsResolver = ({items, config}) => {
  return new ItemsResolver({items, config})
}

class ItemsResolver extends Base {
  constructor({items, config}) {
    super(config)
    this.items = items
    this.config = config
  }

  resolve() {
    return this
      .items
      .map(this.resolveItem.bind(this))
  }

  resolveItem(item) {
    return this
      .typeResolver(item)
      .resolve()
      .resolvedTypeName
  }

  typeResolver(item) {
    return createPropertyEntityResolver({property: item, config: this.config}).resolve()
  }
}

module.exports = {
  createItemsResolver,
  ItemsResolver
}
