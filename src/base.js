class Base {
  constructor(config) {
    this.config = config
    this.log = config.log || console.log
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {}
  }

  errMessage(errKey = 'default') {
    return this.message[errKey] || 'error'
  }

  error(name, msg) {
    const errMsg = `[${this.constructor.name}:${name}] ${msg}`
    this.log(errMsg)
    throw new Error(errMsg)
  }
}

module.exports = {
  Base
}
