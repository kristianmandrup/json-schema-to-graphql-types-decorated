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
 * Strting camelization - underscores, dividing words replaces to Capital letters
 * sound_text => soundText.
 * @param {String} text - Word or sentence
 * @param {String} separator - delimiter, '_' by default
 */
const camelize = (text, {
  separator = '_',
  cap = true
} = {}) => {
  const words = text.split(separator)
  const camelized = [
    words[0],
    words
      .slice(1)
      .map((word) => capitalize(word))
  ].join('')
  return cap
    ? capitalize(camelized)
    : camelized
}

const isObjectType = (obj) => {
  return obj === Object(obj);
}

module.exports = {
  capitalize,
  camelize,
  isObjectType
}
