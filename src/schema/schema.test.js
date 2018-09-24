const {createSchema} = require('./schema');
const {schemas} = require('./data');

const built = {
  enums: {},
  types: {}
}

const defaults = {
  config: {
    built
  }
}

// crazy stuff to allow various ways to initialize, by string lookup in schemas
// map etc.
const create = (obj) => {
  const $schema = typeof obj === 'string'
    ? schemas[obj]
    : obj.schema
  const config = obj.config || defaults.config
  typeof $schema === 'string'
    ? schemas[schema]
    : $schema
  return createSchema({schema: $schema, config})
}

const resolve = (obj) => {
  return create(obj).resolve()
}

describe('Schema', () => {
  describe('invalid schema', () => {
    test('it fails if not an object type', () => {
      try {
        resolve('invalid')
      } catch (err) {
        expect(err).toBeTruthy()
      }
    })
  })

  describe('valid schema', () => {
    const resolved = resolve('valid')
    const {enums, types} = resolved

    test('it resolves schema', () => {
      console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    describe('enums', () => {
      const keys = Object.keys(enums)

      test('has Color enum', () => {
        expect(enums.Color).toBeTruthy()
      })

      test('has ChildCount enum', () => {
        expect(enums.ChildCount).toBeTruthy()
      })
    })

    describe('types', () => {
      const keys = Object.keys(enums)

      test('has Person type', () => {
        expect(types.Person).toBeTruthy()
      })

      test('has Account type', () => {
        expect(types.Account).toBeTruthy()
      })

      test('has Car type', () => {
        expect(types.Car).toBeTruthy()
      })
    })
  })
})
