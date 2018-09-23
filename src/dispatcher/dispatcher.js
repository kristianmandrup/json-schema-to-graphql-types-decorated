class Dispatcher {
  constructor({state, config}) {
    this.state = state
    this.config = config
  }

  dispatch(event) {
    this.log(event)
    this
      .state
      .onEvent(event)
  }
}

module.exports = {
  Dispatcher
}
