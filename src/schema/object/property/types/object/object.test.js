const {resolve} = require('./object')

const objs = {
  invalid: {
    type: 'number'
  },
  bad: {
    type: 'object'
  },
  account: {
    "description": "Bank account",
    type: 'object',
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

const config = {}

const createParams = (key, value, config = {}) => {
  return {key, value, type: value.type, config}
}

const $create = (key, value, config) => {
  return resolve(createParams(key, value, config))
}

const create = (key, config) => {
  return $create(key, objs[key], config)
}

describe('resolve', () => {
  test('invalid type', () => {
    const obj = create('invalid')
    expect(obj).toBeFalsy()
  })

  test('bad type', () => {
    try {
      const obj = create('bad')
      const {shape} = obj
      expect(shape.valid).toBe(false)
    } catch (err) {
      console.log(err)
    }
  })

  describe('nested', () => {
    test('valid type with type-ref', () => {
      const obj = create('account')
      const {shape} = obj
      expect(shape.valid).toBe(true)
      expect(shape.is).toEqual('type')
      expect(shape.refType).toEqual('embedded')
      expect(shape.resolvedTypeName).toEqual('Account')
    })
  })

  describe('referenced', () => {
    test('valid type', () => {
      const obj = create('referenced')
      const {shape} = obj
      expect(shape.valid).toBe(true)
      expect(shape.is).toEqual('type')
      expect(shape.refType).toEqual('reference')
      expect(shape.resolvedTypeName).toEqual('Car')
    })
  })
})
