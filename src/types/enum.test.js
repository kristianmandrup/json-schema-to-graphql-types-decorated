const {toEnum} = require('./enum')

const $enum = {
  invalid: {
    type: 'number'
  },
  colors: {
    "description": "Bank accounts",
    type: 'enum',
    enum: ['red', 'blue']
  }
}

describe('toEnum', () => {

  test.only('invalid type', () => {
    const shape = toEnum({key: 'bad', value: $enum.invalid})
    expect(shape).toBeFalsy()
  })

  test('valid type with enum-ref and values', () => {
    const shape = toEnum({key: 'colors', value: $enum.colors})
    expect(shape.valid).toBe(true)
    expect(shape.is).toEqual('enum-ref')
    expect(shape.values).toEqual(['red', 'blue'])
  })
})
