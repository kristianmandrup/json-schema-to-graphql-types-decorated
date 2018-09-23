const {BaseColumnModel} = require('../base')

class DecoratorCollection extends BaseColumnModel {
  constructor({model, config}) {
    super({model, config})
  }

  get oneToMany() {
    return new OneToManyDecorator({})
  }

  get primary() {
    return new ColumnPrimaryDecorator({model, condig})
  }

  get column() {
    return new ColumnDecorator({model, condig})
  }
}
module.exports = {
  DecoratorCollection
}
