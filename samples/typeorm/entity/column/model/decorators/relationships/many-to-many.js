const {Relationship} = require('./relationship')

class ManyToManyDecorator extends Relationship {
  constructor({model, config}) {
    super({model, config})
  }

  get isManyToMany() {
    return this.isManyOut && this.isManyIn
  }
}
