class EntityModel {
  constructor({shape, config}) {
    this.shape = shape
    this.config = config
    this.value = shape.value
    this.db = this.value.db
  }

  get isEntity() {
    return this.db.entity
  }

  get decorators() {
    [this.entityDecorator]
  }

  get entityDecorator() {
    return this.isEntity && 'entity'
  }

  get className() {
    return shape.resolvedTypeName
  }
}
