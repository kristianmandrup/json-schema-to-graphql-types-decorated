const {SchemaEntry} = require('./entry')

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
    const entry = new SchemaEntry({name, key: name, value, config, built})
    console.log({entry})
    test('name', () => {
      expect(entry.name).toEqual('age')
    })

    test('value', () => {
      expect(entry.value).toEqual(value)
    })

    describe('toEntry', () => {
      const result = entry.toEntry()

      test('result object', () => {
        console.log({result})
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
    const name = 'personality'
    const value = values.array
    const entry = new SchemaEntry({name, value, config, built})

    test('name', () => {
      expect(entry.name).toEqual(name)
    })

    test('value', () => {
      expect(entry.value).toEqual(value)
    })

    test('toEntry', () => {
      const result = entry.toEntry()
      expect(result.enum).toBeFalsy()
      expect(result.primitive).toBeTruthy()
      expect(result.type).toBeFalsy()
    })
  })

  describe('enum: colors', () => {
    describe('primitive: number', () => {
      const name = 'colors'
      const entry = new SchemaEntry({name, value: values.enum, config, built})

      test('name', () => {
        expect(entry.name).toEqual(name)
      })

      test('value', () => {
        expect(entry.value).toEqual(value)
      })

      test('toEntry', () => {
        const result = entry.toEntry()
        expect(result.enum).toBeTruthy()
        expect(result.primitive).toBeFalsy()
        expect(result.type).toBeFalsy()
      })
    })
  })
})
