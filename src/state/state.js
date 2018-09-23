const initial = () => ({enums: {}, types: {}, unions: {}, graph: new Graph()})

const isString = (val) => {
  return typeof val === 'string'
}

class State extends GraphState {
  constructor(state = initial()) {
    this.state = state
  }

  get types() {
    return this.state.types
  }

  get enums() {
    return this.state.enums
  }

  add(obj, type) {
    this.ensure(obj, type)
  }

  addRef($from, $to, refType = 'type') {
    const from = this.addOrGet($from)
    const to = this.addOrGet($to)
    refType = refType || $to.$type

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

}

module.exports = {
  State
}
