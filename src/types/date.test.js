const {toDate} = require('./date')

const dates = {
  invalid: {
    type: 'number'
  },
  birthDate: {
    "description": "Bank accounts",
    type: 'date-time'
  }
}

describe('toDate', () => {

  test('invalid type', () => {
    const shape = toDate({key: 'invalid', value: dates.invalid})
    expect(shape).toBeFalsy()
  })

  describe('basic type', () => {
    const shape = toBoolean({key: 'birthDate', value: dates.birthDate, config})

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('birthDate')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('Date')
    })
  })
})

describe('configured with custom scalar type', () => {
  const shape = toBoolean({
    key: 'birthDate',
    value: dates.birthDate
  }, {
    _meta_: {
      types: {
        date: 'MyScalarDate'
      }
    }
  })

  test('creates type with custom scalar date', () => {
    expect(shape.name).toEqual('birthDate')
    expect(shape.is).toEqual('primitive')
    expect(shape.type.basic).toEqual('MyScalarDate')
  })
})
