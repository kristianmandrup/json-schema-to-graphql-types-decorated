const {BaseType, $BaseType, checkType} = require('./base')

const format = 'date-time'

describe.only('checkType', () => {
  describe('not an object', () => {
    test('throws', () => {
      try {
        checkType('x', 'string')
      } catch (err) {
        expect(err).toBeTruthy()
      }

    })
  })

  describe('object with no type and no value', () => {
    test('is false', () => {
      expect(checkType({}, 'string')).toBeFalsy()
    })
  })

  describe('has invalid type and no value', () => {
    test('is false', () => {
      expect(checkType({}, 'string')).toBeFalsy()
    })
  })

  describe('has correct type and no value', () => {
    test('is true', () => {
      expect(checkType({
        type: 'string'
      }, 'string')).toBeTruthy()
    })
  })

  describe('has wrong type and string value', () => {
    test('is false', () => {
      expect(checkType({
        type: 'number',
        value: 'x'
      }, 'string')).toBeFalsy()
    })
  })

  describe('has no type and object value with correct type', () => {
    test('is true', () => {
      expect(checkType({
        value: {
          type: 'string'
        }
      }, 'string')).toBeTruthy()
    })
  })
})

describe('$BaseType', () => {
  const property = {
    format,
    required: true
  }

  describe('constructor', () => {
    const base = new $BaseType(property, config)

    test('format', () => {
      expect(base.format).toEqual(format)
    })

    test('required', () => {
      expect(base.required).toBe(true)
    })
  })

  describe('extractDecorators', () => {})

  describe('extractMeta', () => {})

  describe('resolveAndMergeReferenced', () => {})

  describe('initialize', () => {})
})

describe('BaseType', () => {
  describe('sender', () => {})

  describe('onEntity', () => {})

  describe('dispatch', () => {})

  describe('defaultType', () => {})

  describe('baseType', () => {})

  describe('fullClassName', () => {})

  describe('refTypeName', () => {})

  describe('resolvedTypeName', () => {})

  describe('collection', () => {})

  describe('list', () => {})

  describe('dictionary', () => {})

  describe('configType', () => {})

  describe('overrideType', () => {})

  describe('refType', () => {})

  describe('shape', () => {})
})
