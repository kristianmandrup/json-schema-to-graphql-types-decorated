const {PropType} = require('./prop-type')

describe.skip('PropType', () => {
  const propType = new PropType({})

  test('shape', () => {
    expect(propType.shape).toEqual({})
  })
})
