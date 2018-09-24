const {createPropertiesResolver} = require('./properties')

const create = ({object, config}) => {
  return new createPropertiesResolver({object, config})
}

describe('PropertiesResolver', () => {
  describe('resolve', () => {})
  describe('reduceProp', () => {})
  describe('prepareProperty', () => {})
})
