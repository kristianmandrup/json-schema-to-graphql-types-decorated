const {colors, person, car} = require('./data')
const {State} = require('./state')

describe('State', () => {
  const state = new State()

  describe('initial state', () => {

    test('graph', () => {
      expect(state.graph).toBeDefined()
    })

    describe('type', () => {
      describe('add', () => {
        state.add(person)

        test('added to graph', () => {
          expect(state.hasNode(person.name)).toBe(true)
        })

        test('added to graph', () => {
          expect(state.hasNode(name)).toBe(true)
          expect(state.getNode(name)).toBe(colors)
        })

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

        describe('add edge type->enum', () => {
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

      describe.skip('union', () => {
        describe('add', () => {
          test('added to graph', () => {})

          describe('add edge type->union', () => {
            test('added edge to graph', () => {})
            test('has from:type node', () => {})
            test('has to:union node', () => {})

            test('union node has edges to type nodes', () => {})
          })

        })
      })
    })
  })
})
