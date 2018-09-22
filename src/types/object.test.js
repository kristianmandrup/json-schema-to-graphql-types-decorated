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

describe('toObject', () => {

  test.only('invalid type', () => {
    const shape = toObject({key: 'invalid', value: dates.invalid})
    expect(shape).toBeFalsy()
  })

  test('bad type', () => {
    try {
      const shape = toObject({key: 'bad', value: dates.bad})
      expect(shape.valid).toBe(false)
    } catch (err) {
      console.log(err)
    }
  })

  describe('nested', () => {
    test('valid type with type-ref', () => {
      const shape = toObject({key: 'colors', value: dates.colors})
      expect(shape.valid).toBe(true)
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('embedded')
      expect(shape.type.basic).toEqual('Account')
    })
  })
})
