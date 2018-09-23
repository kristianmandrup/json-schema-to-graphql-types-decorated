class RelationshipDecorator {
  constructor({model, config}) {
    this.model = model
    this.config = config
  }

  get isManyOut() {
    return false
  }

  get isManyIn() {
    return false
  }
}
