const {Base} = require('../base')
const {GraphState} = require('./graph-state')
const {colors, person, graph} = require('./data')
const initial = () => ({enums: {}, types: {}, unions: {}})

const isString = (val) => {
  return typeof val === 'string'
}

const createState = ({state, config}) => {
  return new State({state, config})
}

class State extends Base {
  constructor({
    state = initial(),
    config = {}
  } = {}) {
    super(config)
    this.state = state
    this.state.graph = this.createGraphState()
  }

  createGraphState() {
    return new GraphState(this.config)
  }

  onEvent(event) {
    const {sender, payload} = event
    const {action} = payload || {}
    action
      ? this.execute({action, payload})
      : this.noAction(event)
  }

  noAction(event) {
    this.log({event})
    this.warn('onEvent', 'event missing action')
  }

  execute({action, payload}) {
    const method = this[action]
    return method && method(payload)
  }

  get types() {
    return this.state.types
  }

  get enums() {
    return this.state.enums
  }

  get(key, type) {
    return this.mapFor(type)[key]
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

  add(obj, type) {
    this.ensure(obj, type)
    return this
  }

  addRef($from, $to, refType = 'type') {
    const from = this.addOrGet($from)
    const to = this.addOrGet($to)
    refType = refType || $to.$type

    // TODO: move to GraphState
    if (!this.graph) 
      return

    const fromNode = this
      .graph
      .addOrGetNode(from)
    const toNode = this
      .graph
      .addOrGetNode(to)
    this
      .graph
      .addEdge(fromNode, toNode, {
        reference: true,
        refType
      })
  }

  ensure(value, type) {
    type = type || value.$type
    const map = this.mapFor(type)
    !map && this.erorr('ensure', `Invalid type ${type}`)
    if (!this.has(value, type)) {
      this.setEntry({map, value, name: value.name})
    }
    return map[value.name]
  }

  // TODO: also try to add/ensure node in graph
  setEntry({map, value, type}) {
    map[name] = value
    return this
  }
}

module.exports = {
  State
}
