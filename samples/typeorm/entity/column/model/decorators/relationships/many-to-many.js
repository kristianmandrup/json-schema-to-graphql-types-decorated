const {Relationship} = require('./relationship')

class ManyToManyDecorator extends Relationship {
  constructor({model, config}) {
    super({model, config})
  }

  get name() {
    return 'ManyToMany'
  }

  get args() {
    return [
      {
        key: '()',
        value: 'User'
      }, {
        key: 'user',
        value: 'user.photos'
      }
    ]
  }
}

module.exports = {
  ManyToManyDecorator
}
