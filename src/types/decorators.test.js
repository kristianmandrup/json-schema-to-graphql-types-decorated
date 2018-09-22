const {Decorators} = require('./decorators')

describe.skip('Decorators', () => {
  const decs = new Decorators({})

  test('shape', () => {
    expect(decs.shape).toEqual({})
  })
})
