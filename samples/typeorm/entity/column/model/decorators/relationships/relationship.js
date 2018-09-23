class RelationshipDecorator {
  constructor({model, config}) {
    this.model = model
    this.config = config
  }

  get isManyToMany() {
    return this.isManyOut && this.isManyIn
  }

  get isManyOut() {
    return false
  }

  get isManyIn() {
    return false
  }
}
module.exports = {
  RelationshipDecorator
}
