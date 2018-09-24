const {ItemsResolver} = require('./items')

describe('ItemsResolver', () => {
  const strItem = {
    type: 'string'
  }
  const intItem = {
    type: 'integer'
  }
  const items = [strItem, intItem]
  const config = {}

  const resolver = new ItemsResolver({items, config})

  describe.only('typeResolver', () => {
    const resolved = resolver.typeResolver(strItem)
    test('resolves', () => {
      expect(resolved).toEqual('String')
    })
  })

  describe('resolveItem', () => {
    const resolved = resolver.resolveItem(strItem)
    test('resolves', () => {
      expect(resolved).toEqual('String')
    })
  })

  describe('resolve', () => {
    const resolved = resolver.resolve()

    test('resolves', () => {
      expect(resolved).toEqual(['String', 'Integer'])
    })

  })

})
