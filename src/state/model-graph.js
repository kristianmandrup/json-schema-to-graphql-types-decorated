const Graph = require('graph.js/dist/graph.full')

class ModelGraph {
  constructor(config = {}) {
    const {graph} = config
    this.graph = graph.instance || new Graph(graph.args)
    this.config = config
  }

  addEdge(from, to, value) {
    this
      .graph
      .ensureEdge(from, to, value)
  }

  addOrGetNode(value) {
    if (!isString(value)) {
      this.ensureNode(value)
    }
    return this.getNode(key)
  }

  hasNode(key) {
    this
      .graph
      .hasVertex(key)
  }

  getNode(key) {
    return this
      .graph
      .vertexValue(key)
  }

  hasEdge(from, to) {
    this
      .graph
      .hasEdge(from, to)
  }

  getEdge(from, to) {
    this
      .graph
      .edgeValue(from, to)
  }

  ensureNode(key, value) {
    if (!isString(key)) {
      value = key
      key = key.name
    }
    this
      .graph
      .ensureVertex(key, value)
  }
}

module.exports = {
  ModelGraph
}
