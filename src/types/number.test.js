const {toNumber} = require('./number')

const numbers = {
  invalid: {
    type: 'string'
  },
  age: {
    "description": "Number of years lived",
    type: 'number',
    default: 18
  }
}

const config = {}

describe('toNumber', () => {
  test.only('invalid type', () => {
    const shape = toNumber({key: 'invalid', value: numbers.invalid})
    expect(shape).toBeFalsy()
  })

  describe('basic type', () => {
    const shape = toNumber({key: 'age', value: numbers.age, config})

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('age')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('Float')
    })
  })
})

describe('configured with custom scalar type', () => {
  const shape = toNumber({
    key: 'age',
    value: numbers.age
  }, {
    _meta_: {
      types: {
        number: 'BigInt'
      }
    }
  })

  test('creates type with custom scalar date', () => {
    expect(shape.name).toEqual('age')
    expect(shape.is).toEqual('primitive')
    expect(shape.type.basic).toEqual('BigInt')
  })
})
