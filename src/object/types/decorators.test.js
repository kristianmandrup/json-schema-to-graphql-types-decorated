const {Decorators} = require('./decorators')

const config = {
  targets: {
    prisma: true
  }
}

describe('Decorators: object', () => {
  const decorators = {
    defaultValue: {
      value: 'hello'
    }
  }

  const decs = new Decorators(decorators, config)

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
    expect(decs.pretty).toEqual(' @defaultValue({value: "hello"})')
  })

  test('trimmed', () => {
    expect(decs.trimmed).toEqual('@defaultValue({value: "hello"})')
  })
})

describe('Decorators: bool', () => {
  const decorators = {
    unique: true
  }

  const decs = new Decorators(decorators, config)

  test('trimmed', () => {
    expect(decs.trimmed).toEqual('@unique')
  })
})
