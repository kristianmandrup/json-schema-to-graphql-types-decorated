const {decorators} = require('./decorators')

class ColumnRenderer {
  constructor({model, config}) {
    this.model = model
    this.config = config
    this.column = model.column
    this.decorators = model.decorators
  }

  render() {
    return `  ${columnDecorators}
  ${column.name}: ${column.type}
  `
  }

  get property() {
    const {name, type} = column
    return `${name}: ${type}`
  }

  get columnDecorators() {
    return decorators.render()
  }
}
