const initial = () => ({enums: {}, types: {}, unions: {}, graph: new Graph()})

class GraphQlState extends State {
  constructor(state = initial()) {
    super(state)
  }

  get unions() {
    return this.state.unions
  }
}

module.exports = {
  GraphQlState
}
