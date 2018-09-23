class EntityDecoratorModel {
  constructor({shape, config}) {
    this.shape = shape
    this.config = config
    this.value = shape.value
    this.db = this.value.db
  }
}
