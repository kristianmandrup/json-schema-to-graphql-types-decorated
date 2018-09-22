const {toArray} = require('./array')

const arrays = {
  invalid: {
    "type": "number"
  },
  embedded: {
    "description": "Bank accounts",
    "type": "array",
    "items": {
      "type": {
        "name": "Account",
        properties: {
          "name": {
            "type": "string"
          }
        }
      }
    }
  },
  defRef: {
    "description": "Bank accounts",
    "type": "array",
    "items": {
      "$ref": "#/definitions/account"
    }
  }
}

const config = {}

describe('toArray', () => {
  test.only('invalid type', () => {
    const shape = toArray({key: 'bad', value: arrays.invalid})
    expect(shape).toBeFalsy()
  })

  describe('item type is embedded', () => {
    const shape = toArray({key: 'accounts', value: arrays.embedded, config})

    test('creates shape with embedded type', () => {
      expect(shape.name).toEqual('accounts')
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('embedded')
      expect(shape.type.basic).toEqual('Account')
    })
  })

  describe('item type is definiton reference', () => {
    test('creates shape with reference type', () => {
      const shape = toArray({key: 'accounts', value: arrays.defRef, config})
      expect(shape.name).toEqual('accounts')
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('reference')
      expect(shape.type.basic).toEqual('Account')
    })
  })
})
