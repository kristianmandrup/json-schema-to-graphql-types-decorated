const {buildTypes} = require('../');

const schema = {
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
    id: {
      type: "string",
      generated: true,
      unique: true
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
        "type": "Account"
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
  },
  "definitions": {
    "account": {
      "description": "Bank account",
      "type": "object",
      "decorators": {
        "client": true
      },
      "properties": {
        id: {
          type: "string",
          generated: true,
          unique: true
        },
        "name": {
          "description": "Name of the account",
          "type": "string"
        },
        "money": {
          "description": "Money in account",
          "type": "number",
          required: true
        },
        "type": {
          "description": "Account type",
          // should be implicit: "name": "AccountType",
          "type": "string",
          "enum": ["saving", "credit", 42]
        }
      }
    }
  },
  "required": ["name"]
}

describe('converts JSON schema to GraphQL types with decorators', () => {
  let types
  beforeEach(() => {
    types = buildTypes(schema)
  })

  describe('Person type', () => {
    const Person = types['Person']

    test('is named Person', () => {
      console.log({Person})
      expect(Person.name).toEqual('Person')
    })

    test('has an id property of type ID', () => {
      expect(Person.props.id.type).toEqual('ID')
    })

    test('has an name property of type String', () => {
      expect(Person.props.name.type).toEqual('String')
    })

    test('has an money property of type Float', () => {
      expect(Person.props.money.type).toEqual('Float')
    })

    test('has an accounts property of type [Account]', () => {
      expect(Person.props.accounts.type).toEqual('[Account]')
    })

    test('has an numberOfChildren property of type [Int]', () => {
      expect(Person.props.numberOfChildren.type).toEqual('[Int]')
    })

    test('has a car property of type Car', () => {
      expect(Person.props.car.type).toEqual('Car')
    })

    test('pretty prints Person type', () => {
      const pretty = `type Person {\n  id: ID!\n  name: String! @connection(name: "UserNames")\n  age: Int!\n  money: Float\n  accounts: [Account]\n}\n`
      expect(Person.toString()).toEqual(pretty)
    })
  })

  describe('Account type', () => {
    const Account = types['Account']

    test('is named Account', () => {
      expect(Account.name).toEqual('Account')
    })

    test('has an id property of type ID', () => {
      expect(Account.props.id.type).toEqual('ID')
    })

    test('has an name property of type String', () => {
      expect(Account.props.name.type).toEqual('String')
    })

    test('has an money property of type Float', () => {
      expect(Account.props.money.type).toEqual('Float')
    })

    test('has an inline type enum of type AccountType', () => {
      expect(Account.props.type.type).toEqual('AccountType')
    })
  })

  describe('PersonCar type', () => {
    test('is named Account', () => {
      expect(Car.name).toEqual('Car')
    })

    test('has an name property of type String', () => {
      expect(Car.props.name.type).toEqual('String')
    })

  })

  describe('Color enum', () => {
    const Color = enums['Color']

    test('is named Color', () => {
      expect(Color.name).toEqual('Color')
    })

    test('has client decorator', () => {
      expect(Color.decorators).toEqual({client: true})
    })

    test('has values red, green and blue', () => {
      expect(Color.values.names).toEqual(['red', 'green', 'blue'])
    })

  })

  describe('AccountType enum', () => {
    const AccountType = enums['AccountType']

    test('has values red, green and blue', () => {
      expect(AccountType.values.names).toEqual(['saving', 'credit'])
    })
  })
})
