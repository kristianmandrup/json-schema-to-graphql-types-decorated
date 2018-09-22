const {toString} = require('./string')

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
  return {key, value, type: value.type, config}
}

const create = (key, config) => {
  return toString(createParams(key, string[key], config))
}

describe('toString', () => {
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
      expect(shape.name).toEqual('greeting')
      expect(shape.is).toEqual('primitive')
      expect(shape.type.basic).toEqual('String')
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

  test('creates type with custom scalar date', () => {
    expect(str.overrideType).toEqual(undefined)
    expect(str._meta).toEqual({
      types: {
        string: 'MyString'
      }
    })
    expect(str.baseType).toEqual('MyString')
    expect(str._types).toEqual({string: 'MyString'})

    expect(shape.name).toEqual('greeting')
    expect(shape.is).toEqual('primitive')
    expect(shape.type.basic).toEqual('MyString')
  })
})
