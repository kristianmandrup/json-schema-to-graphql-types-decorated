const {createPropOutputHandler} = require('./props')

const properties = {
  id: {
    type: "string",
    required: true
  },
  "name": {
    "description": "Name of the person",
    "type": "string"
  }
}

describe.only('createPropOutputHandler', () => {
  const initial = {
    props: {},
    enums: {},
    types: {}
  }
  const handler = createPropOutputHandler({properties})

  describe('types', () => {
    const {types} = handler(initial, 'id')

    test('are empty', () => {
      expect(Array.from(types).length).toBe(0)
    })
  })

  describe('enums', () => {
    const {enums} = handler(initial, 'id')

    test('are empty', () => {
      expect(Array.from(enums).length).toBe(0)
    })
  })

  describe('props', () => {
    test('has id prop', () => {
      const {props} = handler(initial, 'id')
      expect(props.id).toBeTruthy()
      expect(props.id.name).toEqual('id')
      expect(props.id.type.basic).toEqual('String')
    })

    test('has name prop', () => {
      const {props} = handler(initial, 'name')
      expect(props.name).toBeTruthy()
      expect(props.name.name).toEqual('name')
      expect(props.name.type.basic).toEqual('String')
    })
  })
})

describe('propsToOutput', () => {
  const result = propsToOutput({properties})

  describe('props', () => {
    const {props} = result

    test('has props', () => {
      expect(props).toBeTruthy()
    })
  })

  describe('enums', () => {
    const {enums} = result

    test('has enums', () => {
      expect(enums).toBeTruthy()
    })
  })

  describe.only('types', () => {
    const {types} = result

    test('has types', () => {
      expect(types).toBeTruthy()
    })

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
