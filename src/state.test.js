const {State} = require('./state')

describe('State', () => {
  describe('initial state', () => {})

  describe('enum', () => {
    describe('add', () => {
      test('added to map', () => {})

      test('added to graph', () => {})
    })

    describe('add edge type->enum', () => {
      test('added edge to graph', () => {})
      test('has from:type node', () => {})
      test('has to:enum node', () => {})
    })
  })

  describe('type', () => {
    describe('add', () => {
      test('added to map', () => {})

      test('added to graph', () => {
        test('type node has edges to property nodes', () => {})
      })
    })

    describe('add edge type->type', () => {
      test('added edge to graph', () => {})
      test('has from:type node', () => {})
      test('has to:type node', () => {})
    })
  })

  describe('union', () => {
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
