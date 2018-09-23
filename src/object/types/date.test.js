const {toDate} = require('./date')

const dates = {
  invalid: {
    type: 'number'
  },
  birthDate: {
    "description": "Bank accounts",
    type: 'string',
    format: 'date-time'
  }
}

const config = {}

const createParams = (key, value, config = {}) => {
  return {key, value, type: value.type, config}
}

const $create = (key, value, config) => {
  return toDate(createParams(key, value, config))
}

const create = (key, config) => {
  return $create(key, dates[key], config)
}

describe('toDate', () => {

  test('invalid type', () => {
    const str = create('invalid')
    expect(str).toBeFalsy()
  })

  describe.only('basic type', () => {
    const str = create('birthDate')
    const {shape} = str
    console.log({str, shape})

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('birthDate')
      expect(shape.is).toEqual('scalar')
      expect(shape.type.basic).toEqual('Date')
    })
  })
})

describe('configured with custom scalar type', () => {
  const config = {
    _meta_: {
      types: {
        date: 'MyScalarDate'
      }
    }
  }
  const str = create('birthDate', config)
  const {shape} = str

  test('creates type with custom scalar date', () => {
    expect(shape.name).toEqual('birthDate')
    expect(shape.is).toEqual('scalar')
    expect(shape.type.basic).toEqual('MyScalarDate')
  })
})
