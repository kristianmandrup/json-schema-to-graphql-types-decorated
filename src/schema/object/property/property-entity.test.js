const {createPropertyEntityResolver} = require('./property-entity')

const values = {
  number: {
    type: 'number'
  },
  enum: {
    type: 'string',
    enum: ['good', 'bad']
  },
  array: {
    type: 'array',
    items: [
      {
        type: 'integer'
      }
    ]
  }
}

const config = {}

const create = ({property, config}) {
  return new createPropertyEntityResolver({property, config})
}

describe('PropertyEntityResolver', () => {
  describe('primitive: number', () => {
    const value = values.number
    const name = 'age'
    const property = {
      name,
      key: name,
      value
    }
    const resolver = create({property, config})

    describe('selectEntity', () => {
      describe('one primitive result', () => {
        const map = {
          primitive: {
            name: 'x'
          }
        }
        const selected = resolver.selectEntity(map)
        test('selects only value', () => {
          expect(selected.name).toEqual('x')
        })
      })

      describe('enum and primitive results', () => {
        const map = {
          primitive: {
            name: 'x'
          },
          enum: {
            name: 'myEnum'
          }
        }
        const selected = resolver.selectEntity(map)
        test('selects enum over primitive', () => {
          expect(entity.value.name).toEqual('myEnum')
        })
      })

      describe('multiple conflicting results', () => {
        const map = {
          primitive: {
            name: 'x'
          },
          type: {
            name: 'myType'
          }
        }

        test('throws', () => {
          try {
            resolver.selectEntity(map)
          } catch (err) {
            expect(err).toBeTruthy()
          }
        })
      })
    })

    describe('resolve', () => {
      const entity = resolver.resolve()

      test('entity object', () => {
        expect(entity.type).toEqual('primitive')
        expect(entity.value).toBeTruthy()
      })

      test('primitive', () => {
        const {value} = entity
        expect(value.jsonPropType).toEqual('number')
        expect(value.expandedType).toEqual('float')
        expect(value.name).toEqual('age')
        expect(value.resolvedTypeName).toEqual('Float')
      })
    })
  })

  describe('primitive: array', () => {
    const name = 'scores'
    const value = values.array
    const resolver = create({name, key: name, value, config, built})

    describe('resolve', () => {
      const entity = resolver.resolve()

      test('entity object', () => {
        expect(entity.type).toEqual('primitive')
        expect(entity.value).toBeTruthy()
      })

      test('primitive', () => {
        const {value} = entity || {}
        expect(value.jsonPropType).toEqual('number')
        expect(value.expandedType).toEqual('float')
        expect(value.name).toEqual('scores')
        expect(value.list).toBe(true)
        expect(value.resolvedTypeName).toEqual('Int')
      })
    })
  })

  describe('enum: colors', () => {
    describe('primitive: number', () => {
      const name = 'colors'
      const resolver = create({name, key: name, value: values.enum, config, built})

      describe('resolve', () => {
        const entity = resolver.resolve()

        test('result object', () => {
          expect(entity.type).toEqual('enum')
          expect(entity.value).toBeTruthy()
        })

        test('enum', () => {
          const {value} = entity || {}
          expect(value.name).toEqual('colors')
          expect(value.values).toEqual(['good', 'bad'])
        })
      })
    })
  })
})
