const {resolve} = require('./number')

const numbers = {
  invalid: {
    type: 'string'
  },
  age: {
    "description": "Number of years lived",
    type: 'integer',
    default: 18
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
  return $create(key, numbers[key], config)
}

describe('Number', () => {
  test('invalid type', () => {
    const str = create('invalid')
    expect(str).toBeFalsy()
  })

  describe('basic type', () => {
    const str = create('age')
    const {shape} = str

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('age')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('Int')
    })
  })
})

describe('configured with custom scalar type', () => {
  const config = {
    _meta_: {
      types: {
        int: 'BigInt'
      }
    }
  }
  const str = create('age', config)
  const {shape} = str

  test('creates type with custom scalar date', () => {
    expect(shape.name).toEqual('age')
    expect(shape.is).toEqual('primitive')
    expect(shape.type.basic).toEqual('BigInt')
  })
})
