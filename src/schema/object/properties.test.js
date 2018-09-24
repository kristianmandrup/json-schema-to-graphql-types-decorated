const {createPropertiesResolver} = require('./properties')
const {schemas} = require('../data');

const create = ({object, config}) => {
  return new createPropertiesResolver({object, config})
}

describe('PropertiesResolver', () => {
  const object = schemas.valid
  describe('validate', () => {
    test('missing ownerName - error', () => {
      try {
        object.ownerName = undefined
        create({object, config})
      } catch (err) {
        expect(err).toBeDefined()
      }
    })

    test('has ownerName - no error', () => {
      try {
        object.ownerName = 'person'
        const created = create({object, config})
        expect(created).toBeDefined()
      } catch (err) {
        expect(err).toBeUnDefined()
      }
    })
  })

  describe('resolve', () => {
    const created = create({object, config})
    const resolved = created.resolve()

    // TODO: test what is resolved
    test('resolves to object', () => {
      expect(typeof resolved).toEqual('object')
    })

    test('age entry is a primitive entity', () => {
      expect(resolved.age.type).toEqual('primitive')
    })

    test('age primitive entity has a value object', () => {
      expect(typeof resolved.age.value).toEqual('object')
    })
  })

  describe('groupByTypes', () => {
    const created = create({object, config})
    const grouped = created.groupByTypes()

    test('created grouped type map by entity type', () => {
      expect(typeof grouped).toEqual('object')
    })

    test('object group has a car entry', () => {
      expect(typeof grouped.object).toEqual('object')
      expect(grouped.object.car).toBeDefined()
    })

    test('primitive group has an age entry', () => {
      expect(typeof grouped.object).toEqual('object')
      expect(grouped.primitive.age).toBeDefined()
    })
  })
})

describe('prepareProperty', () => {
  const properties = {
    age: {
      type: 'number'
    }
  }
  const object = {
    ownerName: 'person',
    properties
  }
  const created = create({object, config})
  const prepared = created.prepareProperty('age')

  describe('raw property', () => {
    const raw = properties.age

    test('no ownerName', () => {
      expect(raw.ownerName).toBeUndefined()
    })

    test('no key', () => {
      expect(raw.key).toBeUndefined()
    })
  })

  describe('prepared', () => {
    test('is an object', () => {
      expect(typeof prepared).toEqual('object')
    })

    test('has ownerName', () => {
      expect(prepared.ownerName).toEqual('person')
    })

    test('has a key', () => {
      expect(prepared.key).toEqual('age')
    })
  })
})

describe('reduceProp', () => {
  const created = create({object, config})
  const entityMap = created.reduceProp('age')
  const {age} = entityMap

  describe('entity', () => {
    test('is an object', () => {
      expect(typeof age).toEqual('object')
    })

    test('is a primitive', () => {
      expect(age.type).toEqual('primitive')
    })

    test('has an object value', () => {
      expect(typeof age.value).toEqual('object')
    })
  })
})
