const {Base} = require('../base')
const {ModelGraph} = require('./model-graph')

class GraphState extends Base {
  constructor(config) {
    super(config)
    this.model = this.createModelGraph(config)
  }

  createModelGraph(opts = {}) {
    return new ModelGraph(opts)
  }

  // delegate
  addEdge(from, to, value) {
    this
      .model
      .addEdge(from, to, value)
  }

  // delegate
  addOrGetNode(value) {
    this
      .model
      .addOrGetNode(value)
  }

  // delegate
  hasNode(key) {
    this
      .model
      .hasNode(key)
  }

  // delegate
  getNode(key) {
    this
      .model
      .getNode(key)
  }

  // delegate
  hasEdge(from, to) {
    this
      .model
      .hasEdge(from, to)
  }

  // delegate
  getEdge(from, to) {
    this
      .model
      .getEdge(from, to)
  }

  // delegate
  ensureNode(key, value) {
    this
      .model
      .ensureNode(key, value)
  }
}

module.exports = {
  GraphState
}
