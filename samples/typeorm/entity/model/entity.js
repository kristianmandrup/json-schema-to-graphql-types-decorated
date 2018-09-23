const {BaseEntityModel} = require('./base')
class EntityModel {
  constructor({shape, config}) {
    super({shape, config})
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
