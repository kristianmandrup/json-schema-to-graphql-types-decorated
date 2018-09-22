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

describe('toString', () => {
  test.only('invalid type', () => {
    const shape = toString({key: 'invalid', value: strings.invalid})
    expect(shape).toBeFalsy()
  })

  describe('basic type', () => {
    const shape = toString({key: 'greeting', value: strings.greeting, config})

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
  const shape = toString({
    key: 'greeting',
    value: strings.greeting
  }, {
    _meta_: {
      types: {
        string: 'MyString'
      }
    }
  })

  test('creates type with custom scalar date', () => {
    expect(shape.name).toEqual('greeting')
    expect(shape.is).toEqual('primitive')
    expect(shape.type.basic).toEqual('MyString')
  })
})
