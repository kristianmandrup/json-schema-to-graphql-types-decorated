const {ColumnDecorator} = require('./column')

class PrimaryColumnDecorator extends ColumnDecorator {
  constructor({model, config}) {
    super({model, config})
  }

  get generated() {
    return this.model.generated
  }

  get name() {
    return this.generated
      ? 'PrimaryColumn'
      : 'PrimaryGeneratedColumn'
  }
}
