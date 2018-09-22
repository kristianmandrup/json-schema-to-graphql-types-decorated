const {toArray} = require('./array')

const arrays = {
  invalid: {
    "type": "number"
  },
  embedded: {
    "description": "Bank accounts",
    "type": "array",
    name: 'accounts',
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
    name: 'accounts',
    "items": {
      "$ref": "#/definitions/account"
    }
  }
}

const config = {}

const createParams = (key, value, config = {}) => {
  return {key, value, type: value.type, config}
}

const $create = (key, value, config) => {
  return toBoolean(createParams(key, value, config))
}

const create = (key, config) => {
  return $create(key, arrays[key], config)
}

describe('toArray', () => {
  test.only('invalid type', () => {
    const arr = create('invalid')
    expect(arr).toBeFalsy()
  })

  describe('item type is embedded', () => {
    const arr = create('embedded')
    const {shape} = arr

    test('creates shape with embedded type', () => {
      expect(shape.name).toEqual('accounts')
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('embedded')
      expect(shape.type.basic).toEqual('Account')
    })
  })

  describe('item type is definiton reference', () => {
    test('creates shape with reference type', () => {
      const arr = create('defRef')
      const {shape} = arr
      expect(shape.name).toEqual('accounts')
      expect(shape.is).toEqual('type-ref')
      expect(shape.ref).toEqual('reference')
      expect(shape.type.basic).toEqual('Account')
    })
  })
})
