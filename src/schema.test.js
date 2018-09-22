const {resolveSchema, propsToOutput} = require('./schema');
const properties = {
  id: {
    type: "string",
    generated: true,
    unique: true,
    required: true
  },
  "name": {
    "description": "Name of the person",
    "type": "string",
    "graphql": {
      "decorators": {
        "connection": {
          "name": "UserNames"
        }
      }
    }
  },
  "age": {
    "description": "Age of person",
    "type": "integer",
    required: true
  },
  "money": {
    "description": "Money in pocket",
    "type": "number"
  },
  "accounts": {
    "description": "Bank accounts",
    "type": "array",
    "items": [
      {
        "$ref": "#/definitions/account"
      }
    ]
  },
  "numberOfChildren": {
    "description": "Children parented",
    "type": "array",
    "items": [
      {
        "type": "number",
        "enum": [0, 1, 2]
      }
    ]
  },
  "favoriteCoulor": {
    "description": "Colors liked",
    "name": "color",
    "type": "string",
    "items": {
      "type": "number",
      "enum": ["red", "green", "blue"]
    }
  },
  "car": {
    "description": "Car owned",
    "type": "object",
    "decorators": {
      "client": true
    },
    "properties": {
      name: {
        type: "string"
      }
    }
  }
}

describe('resolveSchema', () => {
  const schema = {
    valid: {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/person.schema.json",
      "title": "Person",
      "description": "A person",
      "type": "object",
      graphql: {
        decorators: {
          client: true
        }
      },
      properties
    },
    invalid: {
      type: 'number',
      properties: true
    }
  }

  const built = {
    enums: {},
    types: {}
  }

  describe('invalid schema', () => {
    test('it fails if not an object type', () => {
      try {
        resolveSchema(schema.invalid, {}, built)
      } catch (err) {
        expect(err).toBeTruthy()
      }
    })
  })

  describe('valid schema', () => {
    const resolved = resolveSchema(schema.valid, {}, built)
    const {enums, types} = resolved

    test('it resolves schema', () => {
      console.log({resolved})
      expect(resolved).toBeTruthy()
    })

    describe('enums', () => {})

    describe('types', () => {})
  })

  describe('propsToOutput', () => {
    const result = propsToOutput({properties})

    test('props', () => {
      const {props} = result
      expect(props).toBeTruthy()
    })

    test('enums', () => {
      const {enums} = result
      expect(enums).toBeTruthy()
    })

    test('types', () => {
      const {types} = result
      expect(types).toBeTruthy()
    })
  })
})
