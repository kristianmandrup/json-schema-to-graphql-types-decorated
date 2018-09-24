const {resolve, isNumber} = require('./number')

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
  const property = {
    key,
    value
  }
  return {property, config}
}

const $create = (key, value, config) => {
  const params = createParams(key, value, config)
  return resolve(params)
}

const create = (key, config) => {
  const value = numbers[key]
  if (!value) {
    throw new Error(`no such number entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isNumber', () => {
  describe('type: number', () => {
    const check = isNumber({type: 'number'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: string', () => {
    const check = isNumber({type: 'string'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

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
      expect(shape.key).toEqual('age')
      expect(shape.category).toEqual('primitive')
      expect(shape.resolvedTypeName).toEqual('int')
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
    expect(shape.key).toEqual('age')
    expect(shape.category).toEqual('primitive')
    expect(shape.resolvedTypeName).toEqual('BigInt')
  })
})
