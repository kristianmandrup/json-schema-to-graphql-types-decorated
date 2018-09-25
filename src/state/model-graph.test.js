const {ModelGraph} = require('./model-graph')
const {colors, person, graph} = require('./data')

describe('ModelGraph', () => {
  const model = new ModelGraph()

  describe('createGraph', () => {
    const graph = model.createGraph()

    test('creates graph instance', () => {
      expect(graph).toBeDefined()
    })
  })
  describe('addEdge(from, to, value)', () => {
    const from = {
      name: 'x'
    }
    const to = {
      name: 'y'
    }
    const value = {
      color: 'red'
    }
    const edge = graph.addEdge(from, to, value)

    test('ensures nodes are added and adds edge to graph', () => {
      expect(graph.hasEdge('x', 'y')).toBe(true)
      expect(graph.getEdge('x', 'y')).toBe(edge)

      expect(graph.hasNode('x')).toBe(true)
      expect(graph.hasNode('y')).toBe(true)

      expect(graph.getNode('x')).toBe(from)
      expect(graph.getNode('y')).toBe(to)
    })
  })

  describe('addOrGetNode(value)', () => {
    test('ensures nodes is added and returns it', () => {})
  })
  describe('hasNode(key)', () => {
    test('node present - true', () => {})

    test('node not present - false', () => {})
  })
  describe('getNode(key)', () => {
    test('node present - returned', () => {})
    test('node not present - falsy', () => {})
  })
  describe('hasEdge(from, to)', () => {
    test('edge present - true', () => {})
    test('edge not present - false', () => {})
  })
  describe('getEdge(from, to)', () => {
    test('node present - returned', () => {})
    test('node not present - falsy', () => {})
  })
  // see addOrGetNode
  describe('ensureNode(key, value)  ', () => {
    test('ensures node is added and returns it', () => {})
  })
})
