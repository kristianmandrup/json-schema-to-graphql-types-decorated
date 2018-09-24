const camelcase = require('camelcase')

const assign = (left, right) => {
  left = right
}

const assignAt = (left) => (at, right) => {
  left[at] = right
}

/**
 * string capitalization - first letter - capital, other - lowercase.
 * @param {String} word - Word or sentence.
 */
const capitalize = (word) => {
  return `${word
    .slice(0, 1)
    .toUpperCase()}${word
    .slice(1)
    .toLowerCase()}`
}

/**
 * Starting camelization - underscores, dividing words replaces to Capital letters
 * sound_text => soundText.
 * @param {String} text - Word or sentence
 * @param {String} separator - delimiter, '_' by default
 */
const camelize = (text, {
  cap = true
} = {}) => {
  return camelcase(text, {pascalCase: cap})
}

const isObjectType = (obj) => {
  return obj === Object(obj);
}

module.exports = {
  assign,
  assignAt,
  capitalize,
  camelize,
  isObjectType
}
