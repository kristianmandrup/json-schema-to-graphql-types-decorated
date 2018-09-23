const {Relationship} = require('./relationship')

class OneToManyDecorator extends Relationship {
  constructor({model, config}) {
    super({model, config})
  }

  get isOneToMany() {
    return this.isManyOut && !this.isManyIn
  }
}

module.exports = {
  OneToManyDecorator
}
