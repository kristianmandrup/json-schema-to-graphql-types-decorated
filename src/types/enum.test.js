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

  test('invalid type', () => {
    const shape = toDate({key: 'bad', value: $enum.invalid})
    expect(shape.valid).toBe(false)
  })

  test('valid type with enum-ref and values', () => {
    const shape = toDate({key: 'colors', value: $enum.colors})
    expect(shape.valid).toBe(true)
    expect(shape.is).toEqual('enum-ref')
    expect(shape.values).toEqual(['red', 'blue'])
  })
})
