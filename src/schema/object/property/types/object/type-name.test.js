const {createObjectTypeNameResolver} = require('./type-name')

const objects = {
  invalid: {
    "name": {
      "type": "string"
    }
  },
  typeOnly: {
    "type": "object"
  },
  key: {
    "key": "person",
    "type": "object"
  },
  keyAndOwner: {
    "key": "account",
    "ownerName": "person",
    "type": "object"
  },
  named: {
    "type": "object",
    "name": "car"
  },
  ref: {
    "type": "object",
    "name": "#/definitions/SportsCar"
  }
}

const create = (name, config = {}) => {
  return createObjectTypeNameResolver({object: objects[name], config})
}

describe('ObjectTypeNameResolver', () => {
  describe('invalid', () => {})

  describe('type only', () => {
    const config = {}
    const resolver = create('typeOnly', config)
    test('defaults to Object', () => {
      expect(resolver.typeName).toEqual('Object')
    })
  })

  describe('key only', () => {
    const config = {}
    const resolver = create('key', config)
    test('uses key', () => {
      expect(resolver.typeName).toEqual('Person')
    })
  })

  describe('key and owner', () => {
    const config = {}
    const resolver = create('keyAndOwner', config)
    test('uses full name', () => {
      expect(resolver.typeName).toEqual('PersonAccount')
    })
  })

  describe('named', () => {
    const resolver = create('named')
    test('camelizes name', () => {
      expect(resolver.typeName).toEqual('Car')
    })
  })

  describe.skip('definition reference', () => {
    const config = {
      definitions: {}
    }
    const resolver = create('ref', config)

    test('uses ref name', () => {
      expect(resolver.typeName).toEqual('SportsCar')
    })
  })
})
