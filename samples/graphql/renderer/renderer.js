const {Base} = require('../base')

const createRenderer = ({renderers, built, config}) => {
  return new Renderer({renderers, built, config})
}

class Renderer extends Base {
  constructor({renderers, built, config}) {
    this.renderers = renderers || {}
    this.built = built || {}
    this.config = config || {}
  }

  has(name, collection = 'built') {
    return this[collection][name]
  }

  validate(name, collection) {
    !this.has(name, collection) && this.error('render', `${collection} map has no entry for ${name} to render`)
  }

  render(...names) {
    return names.reduce((acc, name) => {
      validate(name, 'renderers')
      validate(name, 'built')
      const renderer = this.renderers[name]
      const builtCol = built[name]
      acc[name] = renderer.render(builtCol)
      return acc
    }, {})
  }
}

module.exports = {
  createRenderer,
  Renderer
}
