const {resolve} = require('./enum')

const enums = {
  invalid: {
    type: 'number'
  },
  colors: {
    "description": "Bank accounts",
    type: 'string',
    enum: ['red', 'blue']
  }
}

const config = {}

const createParams = (key, value, config = {}) => {
  return {key, value, type: value.type, config}
}

const $create = (key, value, config) => {
  return resolve(createParams(key, value, config))
}

const create = (key, config) => {
  return $create(key, enums[key], config)
}

describe('Enum', () => {

  test('invalid type', () => {
    const str = create('invalid')
    const {shape} = str
    expect(shape).toBeFalsy()
  })

  test('valid type with enum-ref and values', () => {
    const str = create('colors')
    const {shape} = str
    expect(shape.valid).toBe(true)
    expect(shape.is).toEqual('enum-ref')
    expect(shape.values).toEqual(['red', 'blue'])
  })
})
