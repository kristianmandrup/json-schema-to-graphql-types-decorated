// for resolving a type definition reference
const dotProp = require('dot-prop');
const {camelize} = require('../utils')

class DefinitionRef {
  constructor({reference, definitions}) {
    this.reference = reference
    this.definitions = definitions || {}
  }

  get normalizedRef() {
    return this
      .reference
      .replace(/^#\//, '')
  }

  get refName() {
    const paths = this
      .reference
      .split('/')
    return paths[paths.length - 1]
  }

  get type() {
    return dotProp(this.definitions, this.normalizedRef)
  }

  get name() {
    this.type.name || this.refName
  }

  get typeName() {
    return camelize(this.name)
  }
}

module.exports = {
  DefinitionRef
}
