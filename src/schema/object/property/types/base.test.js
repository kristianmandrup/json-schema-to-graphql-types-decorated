const {BaseType, $BaseType, checkType} = require('./base')

describe('checkType', () => {
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

const format = 'date-time'
const ownerName = 'person'
const type = 'string'
const name = 'myName'
const required = true
const key = 'kitty'
const $ref = '#/definitions/car'
const reference = $ref
const resolveSchema = () => {
  type : 'number'
}
const rootSchema = {
  definitions: {
    car: {
      type: 'object'
    }
  }
}

const property = {
  format,
  required: true,
  ownerName,
  type,
  format,
  name,
  required,
  key,
  $ref
}

const propDecObj = {
  classDec: 1,
  propDec: 3
}

const classDecObj = {
  classDec: 2
}

const config = {
  namespace: 'db',
  resolveSchema,
  rootSchema,
  decorators: {
    [ownerName]: {
      [key]: classDecObj
    },
    [key]: propDecObj
  }
}

describe('$BaseType', () => {
  describe('constructor', () => {
    const base = new $BaseType({property, config})

    test('key', () => {
      expect(base.key).toBe(key)
    })

    test('name', () => {
      expect(base.name).toBe(name)
    })

    test('ownerName', () => {
      expect(base.ownerName).toBe(ownerName)
    })

    test('type', () => {
      expect(base.type).toBe(type)
    })

    test('format', () => {
      expect(base.format).toEqual(format)
    })

    test('required', () => {
      expect(base.required).toBe(true)
    })

    test('config', () => {
      expect(base.config).toBe(config)
    })

    test('resolveSchema', () => {
      expect(base.resolveSchema).toBe(resolveSchema)
    })

    test('rootSchema', () => {
      expect(base.rootSchema).toBe(rootSchema)
    })

    test('reference', () => {
      expect(base.reference).toBe(reference)
    })

    describe('extractDecorators', () => {
      base.extractDecorators()

      test('ownMeta', () => {
        expect(base.ownMeta).toEqual({})
      })

      test('classDecorators extracted', () => {
        expect(base.classDecorators).toEqual({classDec: 2})
      })

      test('propDecorators extracted', () => {
        expect(base.propDecorators).toEqual({classDec: 1, propDec: 3})
      })

      test('decorators merged', () => {
        expect(base.decorators).toEqual({classDec: 2, propDec: 3})
      })
    })

    describe('extractMeta', () => {})

    describe('resolveAndMergeReferenced', () => {})

    describe('initialize', () => {})
  })
})

describe.only('BaseType', () => {
  const base = new BaseType({property, config})
  const entity = {
    name: 'x'
  }
  const payload = {
    type: 'Car'
  }

  test('sender', () => {
    expect(base.sender).toEqual('propertyType')
  })

  describe('onEntity', () => {
    base.onEntity(entity)
    expect(base.lastSent.payload).toEqual(entity)
  })

  describe('dispatch', () => {
    beforeEach(() => {
      base.lastDispatchedEvent = undefined
    })

    test('has dispatcher: dispatches', () => {
      base.dispatcher = {
        dispatch: () => 'x'
      }
      base.dispatch(payload)
      expect(base.lastDispatchedEvent.payload).toBe(payload)
    })

    test('no dispatcher: no dispatch', () => {
      base.dispatcher = null
      base.dispatch(payload)
      expect(base.lastDispatchedEvent).toBeUndefined()
    })
  })

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
