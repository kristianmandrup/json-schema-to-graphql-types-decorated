const {State} = require('./state')
const {colors, person, graph} = require('./data')

describe('State', () => {
  const state = new State()

  describe('initial state', () => {
    test('enums', () => {
      expect(state.enums).toEqual({})
    })

    test('unions', () => {
      expect(state.unions).toEqual({})
    })

    test('types', () => {
      expect(state.types).toEqual({})
    })

  })

  describe('enum', () => {
    describe('add', () => {
      state.add(colors)
      const {name} = colors

      test('added to map', () => {
        expect(state.has(name, 'enum')).toBe(true)
        expect(state.has(name, 'type')).toBe(false)
      })
    })
  })

  describe('type', () => {
    describe('add', () => {
      state.add(person)

      test('added to map', () => {
        expect(state.has(person.name, 'type')).toBe(true)
      })
    })
  })

  describe.skip('union', () => {
    describe('add', () => {
      test('added to map', () => {})
    })
  })
})
