class JoinTableDecorator extends Relationship {
  constructor({model, config}) {
    super({model, config})
  }

  get use() {
    return this.isJoinTable
  }

  get name() {
    return 'JoinTable'
  }

  get args() {
    return [
      {
        key: 'name',
        value: 'Vote'
      }
    ]
  }

  get isJoinTable() {
    return this.isManyToMany
  }
}

module.exports = {
  JoinTableDecorator
}
