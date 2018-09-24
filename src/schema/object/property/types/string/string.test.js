const {isString, resolve} = require('./string')

const strings = {
  invalid: {
    type: 'boolean'
  },
  greeting: {
    "description": "How person likes to greet",
    type: 'string',
    default: 'hello'
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
  const value = strings[key]
  if (!value) {
    throw new Error(`no such string entry: ${key}`)
  }
  return $create(key, value, config)
}

describe('isString', () => {
  describe('type: string', () => {
    const check = isString({type: 'string'})
    test('is valid', () => {
      expect(check).toBe(true)
    })
  })

  describe('type: string', () => {
    const check = isString({type: 'boolean'})
    test('is invalid', () => {
      expect(check).toBe(false)
    })
  })
})

describe('String', () => {
  test('invalid type', () => {
    const str = create('invalid')
    expect(str).toBeFalsy()
  })

  describe('basic type', () => {
    const str = create('greeting')
    const {shape} = str

    test('is valid type', () => {
      expect(shape.valid).toBe(true)
    })

    test('creates basic type shape', () => {
      expect(shape.key).toEqual('greeting')
      expect(shape.category).toEqual('primitive')
      expect(shape.resolvedTypeName).toEqual('String')
    })
  })
})

describe('configured with custom scalar type', () => {
  const config = {
    _meta_: {
      types: {
        string: 'MyString'
      }
    }
  }
  const str = create('greeting', config)
  const {shape} = str

  test('creates type with custom scalar string', () => {
    expect(str.overrideType).toEqual(undefined)
    expect(str._meta).toEqual({
      types: {
        string: 'MyString'
      }
    })
    expect(str.baseType).toEqual('MyString')
    expect(str._types).toEqual({string: 'MyString'})
    expect(shape.key).toEqual('greeting')
    expect(shape.category).toEqual('primitive')
    expect(shape.resolvedTypeName).toEqual('MyString')
  })
})
