const {Relationship} = require('./relationship')

class OneToManyDecorator extends Relationship {
  constructor({model, config}) {
    super({model, config})
  }

  get name() {
    return 'OneToMany'
  }

  get args() {
    return [
      {
        key: '()',
        value: 'Category'
      }
    ]
  }

  get isOneToMany() {
    return this.isManyOut && !this.isManyIn
  }
}

module.exports = {
  OneToManyDecorator
}
