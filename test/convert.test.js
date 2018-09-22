const {buildTypes} = require('../');

test('converts JSON schema to ElasticSearch Mapping Schema', () => {
  const json = {
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
    "properties": {
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
          "type": "Account"
        }
      }
    },
    "required": ["name"]
  }

  const types = buildTypes(json)
  console.log(types)
  const expectedTypes = `type Person {\n  name: String! @connection(name: "UserNames")\n  age: Int!\n  money: Float\n  accounts: [Account]\n}\n`
  expect(types).toEqual(expectedTypes)
});
