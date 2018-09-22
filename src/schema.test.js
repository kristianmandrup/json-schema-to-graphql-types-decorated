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
    "items": {
      "$ref": "#/definitions/account"
    }
  },
  "numberOfChildren": {
    "description": "Children parented",
    "type": "array",
    "items": {
      "type": "number",
      "enum": [0, 1, 2]
    }
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

describe.skip('resolveSchema', () => {
  test('it resolves object', () => {
    expect(1).toBe(1)
  })

  test('it fails if not an object type', () => {
    expect(1).toBe(1)
  })
})

describe.only('propsToOutput', () => {
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
