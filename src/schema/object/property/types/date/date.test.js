const {resolve, isDate} = require('./date')

const dates = {
  invalid: {
    type: 'date'
  },
  birthDate: {
    "description": "Bank accounts",
    type: 'string',
    format: 'date-time'
  }
}

const config = {}

const createParams = (key, value, config = {}) => {
  const property = {
    key,
    ...value
  }
  return {property, config}
}

const $create = (key, value, config) => {
  const params = createParams(key, value, config)
  return resolve(params)
}

const create = (key, config) => {
  const value = dates[key]
  if (!value) {
    throw new Error(`no such date entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isDate', () => {
  describe('type: date', () => {
    const check = isDate({type: 'date', format: 'date-time'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: string', () => {
    const check = isDate({type: 'string'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('Date', () => {

  test('invalid type', () => {
    const date = create('invalid')
    expect(date).toBeFalsy()
  })

  describe('basic type', () => {
    const date = create('birthDate')
    const {shape} = date

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.key).toEqual('birthDate')
      expect(shape.category).toEqual('primitive')
      expect(shape.resolvedTypeName).toEqual('Date')
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
    expect(shape.key).toEqual('birthDate')
    expect(shape.category).toEqual('primitive')
    expect(shape.resolvedTypeName).toEqual('MyScalarDate')
  })
})
