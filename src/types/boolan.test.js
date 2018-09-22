const {toBoolean} = require('./boolean')

const booleans = {
  invalid: {
    "type": "string"
  },
  withDefault: {
    married: {
      "name": 'married',
      "type": "boolean",
      default: true,
      required: true
    }
  },
  basic: {
    "working": {
      "type": "boolean"
    }
  }
}

const config = {}

describe('toBoolean', () => {

  test.only('invalid type', () => {
    const shape = toBoolean({key: 'bad', value: booleans.invalid})
    expect(shape).toBeFalsy()
  })

  describe('basic type', () => {
    const shape = toBoolean({key: 'working', value: booleans.basic, config})

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.name).toEqual('working')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('Bool')
    })
  })

  describe('with default decorator', () => {
    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates shape with @defaultValue decorator when targeted for prisma', () => {
      const shape = toBoolean({
        key: 'married',
        value: booleans.withDefault
      }, {
        targets: {
          prisma: true
        }
      })
      expect(shape.name).toEqual('married')
      expect(shape.is).toEqual('primitive')
      expect(shape.decorators.default).toBe(true)
      expect(shape.type.basic).toEqual('Bool')
      expect(shape.type.full).toEqual('Bool!')
      expect(shape.type.fullDecorated).toEqual('Bool! @defaultValue(value: true)')
    })

    test('creates basic shape when not configured to target prisma', () => {
      const shape = toBoolean({
        key: 'married',
        value: booleans.withDefault
      }, {
        targets: {
          prisma: false
        }
      })
      expect(shape.decorators.default).toBeFalsy()
      expect(shape.type.fullDecorated).toEqual('Bool!')
    })
  })
})
