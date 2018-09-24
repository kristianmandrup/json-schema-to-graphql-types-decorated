const {Base} = require('../../../../base')
const {createDefinitionRefResolver} = require('../reference')
const {camelize} = require('./utils')

function checkType(property, type) {
  if (typeof property !== 'object') {
    throw new Error(`checkType: Invalid property. Must be an object, was: ${typeof property}: ${property}`)
  }
  return property.type === type
}
class PropertyError extends Error {}

class $BaseType extends Base {
  constructor({
    property,
    config = {}
  } = {}) {
    super(config)
    let {
      ownerName,
      type,
      format,
      name,
      required,
      key,
      $ref
    } = property
    console.log({name})

    this.property = property
    this.key = key
    this.name = name || key
    this.ownerName = ownerName
    this.type = type
    this.format = format
    this.required = required
    this.config = config

    const {resolveSchema, rootSchema} = config
    this.resolveSchema = resolveSchema
    this.rootSchema = rootSchema
    this.reference = $ref
  }

  get defRef() {
    const args = {
      schema: this.rootSchema,
      reference: this.reference
    }
    this._defRef = this._defRef || createDefinitionRefResolver(args)
    return this._defRef
  }

  initialize() {
    this.resolveAndMergeReferenced()
    this.extractMeta()
    this.extractDecorators()
  }

  get refObject() {
    return this.reference
      ? this.defRef.refObject
      : {}
  }

  resolveAndMergeReferenced() {
    const remoteObject = this.refObject
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
    const {ownerName, key} = this
    this.ownMeta = (namespace
      ? this.property[namespace]
      : this.property) || {}
    const ownDecorators = this.ownMeta.decorators
    const decorators = this.config.decorators || {}
    this.classDecorators = (decorators[ownerName] || {})[key] || {}
    this.propDecorators = decorators[key] || {}
    // merge by precedence: own, class, prop, so own overrides all
    this.decorators = {
      ...this.propDecorators,
      ...this.classDecorators,
      ...ownDecorators
    }
  }

  get sender() {
    return 'propertyType'
  }

  onEntity(entity = {}) {
    const event = {
      sender: this.sender,
      payload: {
        ...entity
      }
    }
    this.dispatch(event)
    this.lastSent = event
  }

  dispatch(payload = {}) {
    const event = {
      sender: this.sender,
      payload: payload
    }

    if (!this.dispatcher) {
      return this.warn('dispatch', 'missing dispatcher')
    }

    if (!this.dispatcher.dispatch) {
      return this.error('dispatch', 'Invalid dispatcher. Missing dispatch method')
    }

    this
      .dispatcher
      .dispatch(event)
    this.lastDispatchedEvent = event
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
      type: this.type,
      expandedType: this.kind, // string, number, enum, date, ...
      kind: this.kind,

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
      name: this.name,

      valid: Boolean(this.valid),
      required: Boolean(this.required),

      collection: Boolean(this.collection),
      list: Boolean(this.list),
      dictionary: Boolean(this.dictionary)
    }
  }

  get category() {
    return 'primitive'
  }

  get defaultType() {
    return 'any'
  }

  get baseType() {
    return this.defaultType
  }

  // used for embedded objects if otherwise unable to determine a good type name
  get fullClassName() {
    return camelize([this.ownerName, this.key].join('_'))
  }

  get refTypeName() {
    return this.reference
      ? this.defRef.typeName
      : undefined
  }

  get resolvedTypeName() {
    return this.refTypeName || this.baseType
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

class BaseType extends $BaseType {
  constructor(property, config) {
    super(property, config)
    this.initialize()
  }
}

module.exports = {
  checkType,
  $BaseType,
  BaseType,
  PropertyError
}
