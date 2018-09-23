const {Base} = require('../base')

class GraphState extends Base {
  constructor(state, config) {
    super(config)
    this.state = state
    this.state.graph = new ModelGraph(config)
  }

  get graph() {
    return this.state.graph
  }

  // delegate
  addEdge(from, to, value) {
    this
      .graph
      .addEdge(from, to, value)
  }

  // delegate
  addOrGetNode(value) {
    this
      .graph
      .addOrGetNode(value)
  }

  // delegate
  hasNode(key) {
    this
      .graph
      .hasNode(key)
  }

  // delegate
  getNode(key) {
    this
      .graph
      .getNode(key)
  }

  // delegate
  hasEdge(from, to) {
    this
      .graph
      .hasEdge(from, to)
  }

  // delegate
  getEdge(from, to) {
    this
      .graph
      .getEdge(from, to)
  }

  // delegate
  ensureNode(key, value) {
    this
      .graph
      .ensureNode(key, value)
  }
}

module.exports = {
  GraphState
}
