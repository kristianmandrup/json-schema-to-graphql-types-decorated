const {toBoolean} = require('./boolean')

const booleans = {
  invalid: {
    "type": "string"
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
  return {key, value, type: value.type, config}
}

const create = (key, value, config) => {
  return toBoolean(createParams(key, value, config))
}

describe('toBoolean', () => {

  test('invalid type', () => {
    const str = create('bad', booleans.invalid)
    expect(str).toBeFalsy()
  })

  describe('basic type', () => {
    const str = create('working', booleans.basic)
    const {shape} = str

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('working')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('Boolean')
    })
  })

  describe('with targeted default decorator', () => {
    const config = {
      targets: {
        prisma: true
      }
    }
    const str = create('married', booleans.withDefault, config)
    const {shape} = str

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates shape with @defaultValue decorator when targeted for prisma', () => {
      expect(shape.name).toEqual('married')
      expect(shape.is).toEqual('primitive')
      expect(shape.decorators.default).toBe(true)
      expect(shape.type.basic).toEqual('Boolean')
      expect(shape.type.full).toEqual('Boolean!')
      expect(shape.type.fullDecorated).toEqual('Boolean! @defaultValue(value: true)')
    })

    describe('with untargeted default decorator', () => {
      const config = {
        targets: {
          prisma: false
        }
      }
      const str = create('married', booleans.withDefault, config)
      const {shape} = str

      test('creates basic shape when not configured to target prisma', () => {
        expect(shape.decorators.default).toBeFalsy()
        expect(shape.type.fullDecorated).toEqual('Boolean!')
      })
    })
  })
})
