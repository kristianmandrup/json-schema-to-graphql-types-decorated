const {resolve, isBoolean} = require('./boolean')

const booleans = {
  invalid: {
    "type": "booling"
  },
  withDefault: {
    "name": 'married',
    "type": "boolean",
    default: true,
    required: true
  },
  basic: {
    "type": "boolean"
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
  const value = booleans[key]
  if (!value) {
    throw new Error(`no such boolean entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isBoolean', () => {
  describe('type: boolean', () => {
    const check = isBoolean({type: 'boolean'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: number', () => {
    const check = isBoolean({type: 'number'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('Boolean', () => {

  test('invalid type', () => {
    const bool = create('invalid')
    expect(bool).toBeFalsy()
  })

  describe('basic type', () => {
    const bool = create('basic')
    const {shape} = bool
    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.key).toEqual('basic')
      expect(shape.category).toEqual('primitive')
      expect(shape.baseType).toEqual('Boolean')
      expect(shape.resolvedTypeName).toEqual('Boolean')
    })
  })

  describe('with targeted default decorator', () => {
    const config = {
      targets: {
        prisma: true
      }
    }
    const bool = create('withDefault', config)
    const {shape} = bool

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates shape with @defaultValue decorator when targeted for prisma', () => {
      expect(shape.key).toEqual('withDefault')
      expect(shape.category).toEqual('primitive')
      expect(shape.resolvedTypeName).toEqual('Boolean')
    })

    describe('with untargeted default decorator', () => {
      const config = {
        targets: {
          prisma: false
        }
      }
      const bool = create('withDefault', config)
      const {shape} = bool

      test('creates basic shape when not configured to target prisma', () => {
        expect(shape.resolvedTypeName).toEqual('Boolean')
      })
    })
  })
})
