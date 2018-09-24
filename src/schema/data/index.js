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

const schemas = {
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

module.exports = {
  schemas,
  properties
}
