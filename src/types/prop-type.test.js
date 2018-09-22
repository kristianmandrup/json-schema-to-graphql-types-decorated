const {PropType} = require('./prop-type')
const {Decorators} = require('./decorators')

const overrideType = false
const baseType = 'String'
const required = true
const decorators = new Decorators({
  defaultValue: {
    value: 'hello'
  }
})

describe('PropType', () => {
  const propType = new PropType({overrideType, baseType, required, decorators})

  test('shape', () => {
    expect(propType.shape).toEqual({basic: 'String', full: 'String!', fullDecorated: 'String! @defaultValue({value: "hello"})'})
  })

  test('full', () => {
    expect(propType.full).toEqual('String!')
  })

  test('fullDecorated', () => {
    expect(propType.fullDecorated).toEqual('String! @defaultValue({value: "hello"})')
  })

  test('req', () => {
    expect(propType.req).toEqual('!')
  })

  test('dataType', () => {
    expect(propType.dataType).toEqual('String!')
  })

  test('dataType', () => {
    expect(propType.type).toEqual('String')
  })
})
