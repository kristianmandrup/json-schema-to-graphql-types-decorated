const {resolve, isArray} = require('./array')

const arrays = {
  invalid: {
    "type": "number"
  },
  embedded: {
    "description": "Bank accounts",
    "type": "array",
    name: 'accounts',
    "items": [
      {
        "type": {
          "name": "Account",
          properties: {
            "name": {
              "type": "array"
            }
          }
        }
      }
    ]
  },
  defRef: {
    "description": "Bank accounts",
    "type": "array",
    "name": "accounts",
    "items": [
      {
        "$ref": "#/definitions/account"
      }
    ]
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
  const value = arrays[key]
  if (!value) {
    throw new Error(`no such array entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isArray', () => {
  describe('type: array', () => {
    const check = isArray({type: 'array'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: array', () => {
    const check = isArray({type: 'boolean'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('toArray', () => {
  test('invalid type', () => {
    const arr = create('invalid')
    expect(arr).toBeFalsy()
  })

  describe('item type is embedded', () => {
    const arr = create('embedded')
    const {shape} = arr
    test('creates shape with embedded type', () => {
      expect(shape.name).toEqual('accounts')
      expect(shape.expandedType).toEqual('array')
      expect(shape.type).toEqual('array')
      expect(shape.category).toEqual('primitive')
      expect(shape.refType).toEqual('embedded')
      expect(shape.resolvedTypeName).toEqual('Account')
    })
  })

  describe('item type is definiton reference', () => {
    test('creates shape with reference type', () => {
      const arr = create('defRef')
      const {shape} = arr
      expect(shape.name).toEqual('accounts')
      expect(shape.type).toEqual('array')
      expect(shape.category).toEqual('primitive')
      expect(shape.refTypeName).toEqual('Account')
      expect(shape.refTypeNames).toEqual(['Account'])
      expect(shape.resolvedTypeName).toEqual('Account')
    })
  })
})
