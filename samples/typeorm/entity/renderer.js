class EntityRenderer {
  constructor({model, config}) {
    this.model = model
    this.config = config
  }

  render() {
    return `
${imports}
${entityDecorator}
export class ${model.className} {
  ${body}
}`
  }

  get imports() {
    return
  }

  get typeImports() {
    return `import { Entity } from '`
  }

  get renderTypeOrmImports() {
    return `import { ${this.typeOrmImports} } from "typeorm";`
  }

  get typeOrmImports() {
    return ['Entity']
      .concat(this.relationshipImports)
      .concat(this.columnImports)
  }

  // TODO
  get relationshipImports() {
    return ['ManyToOne']
  }

  // TODO
  get columnImports() {
    return ['PrimaryGeneratedColumn', 'Column']
  }

  get entityDecorator() {
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
