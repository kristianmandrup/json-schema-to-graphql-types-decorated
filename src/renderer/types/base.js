class BaseTypeRenderer {
  get type() {
    return this
      .createPropType()
      .shape
  }

  createPropType() {
    return new PropType({overrideType: this.overrideType, refTypeName: this.refTypeName, isArray: true, decorators: this.decorators, required: this.required})
  }

  toString() {
    return `${this.name}: ${this.type.fullDecorated}`
  }

  get pretty() {
    return this.toString()
  }
}
