const {Base} = require('../../../../base')
const {DefinitionRef} = require('../type-ref')
const {camelize} = require('./utils')
class PropertyError extends Error {}

class BaseType extends Base {
  constructor(property, config) {
    let {ownerName, name, type, value} = property

    config = config || {}
    this.property = property
    this.key = key
    this.name = value.name || key
    this.ownerName = ownerName
    this._type = type
    this.value = value
    this.format = value.format
    this.required = value.required
    this.config = config
    this.built = built

    this.resolveSchema = config.resolveSchema
    this.$schemaRef = config.$schemaRef
    this.reference = this.value.$ref
    this.defRef = new DefinitionRef({schema: this.$schemaRef, reference: this.reference})
    this.resolveAndMergeReferenced()

    this.extractMeta()
    this.extractDecorators()
  }

  resolveAndMergeReferenced() {
    const remoteObject = this
      .defRef
      .resolveObjct()
    this.value = {
      ...this.value,
      remoteObject
    }
  }

  extractMeta() {
    this._meta = this.config._meta_ || {}
    this._types = this._meta.types || {}
  }

  extractDecorators() {
    const {namespace} = this.config
    const ns = this.value[namespace] || {}
    const ownDecorators = ns.decorators || $graphql
    const decorators = this.config.decorators || {}
    this.classDecorators = (decorators[type] || {})[key]
    this.propDecorators = decorators[key]
    this.decorators = ownDecorators || this.classDecorators || this.propDecorators
  }

  get sender() {
    return 'propertyType'
  }

  onEntity(entity) {
    const event = {
      sender: this.sender,
      payload: {
        ...entity
      }
    }
    this.dispatch(event)
  }

  dispatch({payload}) {
    const event = {
      sender: this.sender,
      payload: payload
    }

    if (!this.dispatcher) 
      this.warn('dispatch', 'missing dispatcher')

    this
      .dispatcher
      .dispatch(event)
  }

  get valid() {
    return true
  }

  get shape() {
    return {
      decorators: this.decorators, // decorators extracted from value and config
      config: this.config, // the full config
      value: this.value, // the full property value
      jsonPropType: this.type, // raw
      expandedType: this.kind, // string, number, enum, date, ...

      is: this.is, // custom
      category: this.category, // primitive, enum or object

      fullClassName: this.fullClassName, // ownerName + key
      ownerName: this.ownerName, // Person, Car whoever has the property that references this object
      baseType: this.baseType, // base type

      // the resolved type, such as PersonCar for a Car object under a Person or MegaCar for a remote ref
      resolvedTypeName: this.resolvedTypeName,

      // for Array
      refTypeNames: this.refTypeNames,
      refTypeName: this.refTypeName,

      key: this.key,

      valid: Boolean(this.valid),
      required: Boolean(this.required),

      collection: Boolean(this.collection),
      list: Boolean(this.list),
      dictionary: Boolean(this.dictionary)
    }
  }

  get defaultType() {
    return 'any'
  }

  get baseType() {
    return this.defaultType
  }

  // used for embedded objects if otherwise unable to determine a good type name
  get fullClassName() {
    return camelize([this.ownerName, this.key].join())
  }

  get refTypeName() {
    return this.defRef.typeName
  }

  get resolvedTypeName() {
    return this.baseType || this.refTypeName
  }

  get refType() {
    return undefined
  }

  get collection() {
    return false
  }

  get list() {
    return false
  }

  get dictionary() {
    return false
  }

  get configType() {
    return this._types[this.name]
  }

  get overrideType() {
    return this.configType || this._specialType
  }

  traverseNested() {
    return this
  }

  error(name, msg) {
    name = [this.key, this.type, name].join('::')
    super.error(name, msg)
  }

  get refType() {
    return this.reference
      ? 'reference'
      : 'embedded'
  }
}

module.exports = {
  BaseType,
  PropertyError
}
