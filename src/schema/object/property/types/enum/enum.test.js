const {resolve, isEnum} = require('./enum')

const enums = {
  invalid: {
    type: 'number'
  },
  colors: {
    "description": "Bank accounts",
    type: 'string',
    enum: ['red', 'blue']
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
  const value = enums[key]
  if (!value) {
    throw new Error(`no such string entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isEnum', () => {
  describe('enum non-array', () => {
    const check = isEnum({type: 'string', enum: 'x'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })

  describe('type: string', () => {
    const check = isEnum({type: 'boolean'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })

  describe('enum array', () => {
    const check = isEnum({type: 'string', enum: ['x']})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })
})

describe('Enum', () => {

  test('invalid type', () => {
    const $enum = create('invalid')
    const {shape} = $enum
    expect(shape).toBeFalsy()
  })

  test('valid type with enum-ref and values', () => {
    const $enum = create('colors')
    const {shape} = $enum
    expect(shape.valid).toBe(true)
    expect(shape.category).toEqual('enum')
    expect(shape.values).toEqual(['red', 'blue'])
  })
})
