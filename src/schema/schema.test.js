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
        name: "childCount",
        "enum": [0, 1, 2]
      }
    ]
  },
  "favoriteCoulor": {
    "description": "Colors liked",
    "type": "string",
    "items": [
      {
        "type": "number",
        name: "color",
        "enum": ["red", "green", "blue"]
      }
    ]
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

describe('Schema', () => {
  const schema = {
    valid: {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "http://example.com/person.schema.json",
      "title": "Person",
      "name": "Person",
      "description": "A person",
      "type": "object",
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
