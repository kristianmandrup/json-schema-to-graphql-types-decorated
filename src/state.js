const Graph = require('graph.js/dist/graph.full')
const initial = () => ({enums: {}, types: {}, unions: {}, graph: new Graph()})

const isString = (val) => {
  return typeof val === 'string'
}

class State {
  constructor(state = initial()) {
    this.state = state
  }

  get graph() {
    return this.state.graph
  }

  get types() {
    return this.state.types
  }

  get enums() {
    return this.state.enums
  }

  get unions() {
    return this.state.unions
  }

  onNew(obj) {
    this.ensure(obj)
  }

  onNewEdge($from, $to, refType = 'type') {
    const from = this.addOrGet($from)
    const to = this.addOrGet($to)

    const fromNode = this.addOrGetNode(from)
    const toNode = this.addOrGet(to)
    this.addEdge(fromNode, toNode, {
      reference: true,
      refType
    })
  }

  get(key, type) {
    return this.mapFor(type)[key]
  }

  ensure(value, type) {
    type = type || value.$type
    const map = this.mapFor(type)
    if (!this.has(value, type)) {
      map[value.name] = value
    }
    return map[value.name]
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

  addEdge(from, to, value) {
    this
      .graph
      .ensureEdge(from, to, value)
  }

  mapFor(type) {
    const colName = type + 's'
    if (!this.state[colName]) {
      this.error(`Invalid map type: ${type}`)
    }
    return this.state[colName]
  }

  has(value, type) {
    const name = isString(value)
      ? value
      : value.name
    return this.mapFor(type)[name]
  }

  ensure(obj, type) {
    this.ensure(obj, type)
    this.ensureNode(obj, type)
    return this
  }

  getNode(key) {
    return this
      .graph
      .vertexValue(key)
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
  State
}
