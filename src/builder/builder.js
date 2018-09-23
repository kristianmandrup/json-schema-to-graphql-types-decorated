const {createSchema} = require('../schema/schema')
const {State} = require('../state/state')

const {Base} = require('../base')

const createBuilder = ({state, schema, config}) => {
  return new Builder({state, schema, config})
}

class Builder {
  constructor({state, schema, config}) {
    this.state = state || new State()
    this.schema = schema || {}
    this.config = config || {}
    this.renderers = config.renderers || {}
    this.renderer = createRenderer({renderers, built: this.built})
  }

  build() {
    this.built = createSchema({schema, config}).resolve()
    return this
  }

  render() {
    this.rendered = this
      .renderer
      .render()
    return this
  }
}

module.exports = {
  createBuilder,
  Builder
}
