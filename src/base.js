class Base {
  constructor(config = {}) {
    this.config = config
    this.log = config.log || console.log
    this.logErr = config.error || console.error
  }

  message() {
    return config.messages[this.key] || config.messages[this.type] || {}
  }

  errMessage(errKey = 'default') {
    return this.message[errKey] || 'error'
  }

  warn(name, msg) {
    const errMsg = `WARNING [${this.constructor.name}:${name}] ${msg}`
    this.log(errMsg)
  }

  error(name, msg) {
    const errMsg = `ERROR [${this.constructor.name}:${name}] ${msg}`
    this.logErr(errMsg)
    throw new Error(errMsg)
  }
}

module.exports = {
  Base
}
