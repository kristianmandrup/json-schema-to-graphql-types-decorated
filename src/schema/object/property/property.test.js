const {createProperty} = require('./property')

const built = {
  enums: {},
  types: {}
}

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

describe('SchemaEntry', () => {
  describe('primitive: number', () => {
    const value = values.number
    const name = 'age'
    const property = {
      name,
      key: name,
      value
    }
    const entry = createProperty({property, config})

    describe('toEntry', () => {
      const result = entry.toEntry()

      test('result object', () => {
        expect(result.enum).toBeFalsy()
        expect(result.primitive).toBeTruthy()
        expect(result.type).toBeFalsy()
      })

      test('primitive', () => {
        const {primitive} = result || {}
        expect(result.primitive.name).toEqual('age')
        expect(result.primitive.type.basic).toEqual('Float')
      })
    })
  })

  describe('primitive: array', () => {
    const name = 'scores'
    const value = values.array
    const entry = new SchemaEntry({name, key: name, value, config, built})

    describe('toEntry', () => {
      const result = entry.toEntry()

      test('result object', () => {
        expect(result.enum).toBeFalsy()
        expect(result.primitive).toBeTruthy()
        expect(result.type).toBeFalsy()
      })

      test('primitive', () => {
        const {primitive} = result || {}
        expect(result.primitive.name).toEqual('scores')
        expect(result.primitive.type.full).toEqual('[Int]')
      })
    })
  })

  describe('enum: colors', () => {
    describe('primitive: number', () => {
      const name = 'colors'
      const entry = new SchemaEntry({name, key: name, value: values.enum, config, built})

      describe('toEntry', () => {
        const result = entry.toEntry()

        test('result object', () => {
          expect(result.$enum).toBeTruthy()
          expect(result.primitive).toBeFalsy()
          expect(result.type).toBeFalsy()
        })

        test('enum', () => {
          const {$enum} = result || {}
          expect($enum.name).toEqual('colors')
          expect($enum.values).toEqual(['good', 'bad'])
        })
      })
    })
  })
})
