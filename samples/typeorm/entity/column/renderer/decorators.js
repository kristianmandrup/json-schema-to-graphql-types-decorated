class ColumnDecoratorRenderer {
  constructor({decorator, config}) {
    this.decorator = decorator
    this.config = config
    this.name = decorator.name
    this.args = decorator.args
  }

  render() {
    return `@${this.name}(${this.args})`
  }

  get args() {
    return ''
  }
}
