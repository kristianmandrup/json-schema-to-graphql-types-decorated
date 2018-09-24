const {Base} = require('../base')

const createDispatcher = ({state, config}) => {
  return new Dispatcher({state, config})
}

class Dispatcher extends Base {
  constructor({state, config}) {
    super(config)
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
  createDispatcher,
  Dispatcher
}
