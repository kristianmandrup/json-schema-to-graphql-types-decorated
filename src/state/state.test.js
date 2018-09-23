const {State} = require('./state')

describe('State', () => {
  const state = new State()

  const colors = {
    name: 'colors',
    $type: 'enum',
    values: ['red', 'blue']
  }

  const person = {
    name: 'person',
    $type: 'type',
    properties: {
      age: 32
    }
  }

  const car = {
    name: 'car',
    $type: 'type',
    properties: {
      brand: 'BMW'
    }
  }

  describe('initial state', () => {
    expect(state.enums).toEqual({})
    expect(state.unions).toEqual({})
    expect(state.types).toEqual({})
    expect(state.graph).toBeDefined()
  })

  describe('enum', () => {
    describe('add', () => {
      state.add(colors)
      const {name} = colors

      test('added to map', () => {
        expect(state.has(name, 'enum')).toBe(true)
        expect(state.has(name, 'type')).toBe(false)
      })

      test('added to graph', () => {
        expect(state.hasNode(name)).toBe(true)
        expect(state.getNode(name)).toBe(colors)
      })

      describe.skip('add edge type->enum', () => {
        state.add(person)
        state.addRef(person, colors)

        test('added edge to graph', () => {
          expect(state.hasEdge(person.name, colors.name)).toBe(true)
        })
        test('has from:type node', () => {
          expect(state.hasNode(person.name)).toBe(true)
        })
        test('has to:enum node', () => {
          expect(state.hasNode(colors.name)).toBe(true)
        })
      })
    })
  })

  describe('type', () => {
    describe('add', () => {
      state.add(person)

      test('added to map', () => {
        expect(state.has(person.name, 'type')).toBe(true)
      })

      test('added to graph', () => {
        expect(state.hasNode(person.name)).toBe(true)
      })

      test('type node has edges to property nodes', () => {})

      describe('add edge type->type', () => {
        state.add(car)
        state.addEdge(person, car)

        test('added edge to graph', () => {
          expect(state.hasEdge(person.name, car.name)).toBe(true)
          const edge = state.getEdge(person.name)
          expect(edge.refType).toBe('type')
          expect(edge.reference).toBe(true)
        })
        test('has from:type node', () => {
          expect(state.hasNode(person.name)).toBe(true)
          expect(state.getNode(person.name).$type).toBe('type')
        })
        test('has to:type node', () => {
          expect(state.hasNode(car.name)).toBe(true)
          expect(state.getNode(car.name).$type).toBe('type')
        })
      })
    })
  })

  describe.skip('union', () => {
    describe('add', () => {
      test('added to map', () => {})

      test('added to graph', () => {})
    })

    describe('add edge type->union', () => {
      test('added edge to graph', () => {})
      test('has from:type node', () => {})
      test('has to:union node', () => {})

      test('union node has edges to type nodes', () => {})
    })
  })
})
