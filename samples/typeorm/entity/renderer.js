class EntityRenderer {
  constructor({model, config}) {
    this.model = model
    this.config = config
  }

  render() {
    return `${entityDecorator}
export class ${model.className} {
  ${body}
}`
  }

  entityDecorator() {
    return `@Entity()`
  }

  body() {
    return this
      .model
      .columns
      .render()
      .join('\n')
  }
}

module.exports = {
  EntityRenderer
}
