const {BaseProp, PropError} = require('./base')
const {capitalize} = require('./utils')

const types = {
  array: require('./array/array'),
  boolean: require('./boolean/boolean'),
  number: require('./number/number'),
  object: require('./object/object'),
  string: require('./string/string'),
  date: require('./date/date'),
  enum: require('./enum/enum')
}

const typeNames = [
  'array',
  'boolean',
  'number',
  'object',
  'string',
  'date',
  'enum'
]

const resolvers = typeNames.reduce((acc, name) => {
  acc[name] = types[name].resolve
  return acc
}, {})

const classes = typeNames.reduce((acc, name) => {
  const className = `${capitalize(name)}Type`
  acc[name] = types[name][className]
  return acc
}, {})

module.exports = {
  resolvers,
  classes
}
