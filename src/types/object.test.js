const {toObject} = require('./object')

const dates = {
  invalid: {
    type: 'number'
  },
  bad: {
    type: 'object'
  },
  nested: {
    "description": "Bank account",
    type: 'object',
    name: 'account',
    properties: {
      "name": {
        "type": "string"
      }
    }
  },
  referenced: {
    type: 'object',
    "$ref": "#/definitions/car"
  }
}

describe('toEnum', () => {

  test('invalid type', () => {
    const shape = toDate({key: 'invalid', value: dates.invalid})
    expect(shape).toBeFalsy()
  })

  test('bad type', () => {
    try {
      const shape = toDate({key: 'bad', value: dates.bad})
      expect(shape.valid).toBe(false)
    } catch (err) {
      console.log(err)
    }
  })

  describe('nested', () => {
    test('valid type with type-ref', () => {
      const shape = toDate({key: 'colors', value: dates.colors})
      expect(shape.valid).toBe(true)
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('embedded')
      expect(shape.type.basic).toEqual('Account')
    })
  })
})
