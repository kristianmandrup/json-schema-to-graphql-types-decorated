const {createSchemaObject} = require('./object')

const create = ({schema, value, config, opts}) => {
  return new createSchemaObject({schema, value, config, opts})
}

describe('SchemaObject', () => {
  describe('schema', () => {
    const schema = {}
    const config = {}
    const obj = create({schema, config})

    test('type', () => {
      expect(obj.type).toEqual('schema')
    })

    test('validate', () => {
      try {
        const valid = obj.validate()
        expect(valid).toBe(true)
      } catch (err) {}
    })

    test('config.$schemaRef', () => {
      expect(obj.config.$schemaRef).toBe(schema)
    })

    test('isSchema', () => {
      expect(obj.isSchema).toBe(true)
    })

    test('resolve', () => {
      const resolved = obj.resolve()
      console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    test('shouldNormalize', () => {
      expect(obj.shouldNormalize).toBe(true)
    })

    test('normalize', () => {
      obj.normalize()
      expect(obj.properties.age.required).toBe(true)
    })
  })

  describe('object', () => {
    const schema = {}
    const config = {}
    const obj = create({value: schema, config})

    test('type', () => {
      expect(obj.type).toEqual('object')
    })

    test('validate', () => {
      try {
        const valid = obj.validate()
        expect(valid).toBe(true)
      } catch (err) {}
    })

    test('config.$schemaRef', () => {
      expect(obj.config.$schemaRef).toBeUndefined()
    })

    test('isSchema', () => {
      expect(obj.isSchema).toBe(false)
    })

    test('resolve', () => {
      const resolved = obj.resolve()
      console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    test('shouldNormalize', () => {
      expect(obj.shouldNormalize).toBe(false)
    })
  })
})
