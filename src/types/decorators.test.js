const {Decorators} = require('./decorators')

const decorators = {
  defaultValue: {
    value: 'hello'
  }
}

const config = {
  targets: {
    prisma: true
  }
}

describe.skip('Decorators', () => {
  const decs = new Decorators({decorators, config})

  test('hasProps(props)', () => {})

  test('hasAny', () => {
    expect(decs.hasAny).toBe(true)
  })

  test('hasAnyValid', () => {
    expect(decs.hasAnyValid).toBe(true)
  })

  test('goodKeys', () => {
    expect(decs.goodKeys).toEqual(['defaultValue'])
  })

  test('hasValidKeys', () => {
    expect(decs.hasValidKeys).toBe(true)
  })

  test('hasInvalidKey', () => {
    expect(decs.hasInvalidKey).toBe(false)
  })

  test('config', () => {
    expect(decs.config).toEqual({
      defaultValue: {
        value: 'hello'
      }
    })
  })

  test('pretty', () => {
    expect(decs.pretty).toEqual('@defaultValue({value: "hello"})')
  })
})
