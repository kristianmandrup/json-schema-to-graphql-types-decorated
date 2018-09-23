class ColumnModel {
  constructor({shape, config}) {
    this.shape = shape
    this.config = config
    this.value = shape.value
    this.db = this.value.db || {}
  }

  // TRY: always except if explicitly false
  get isColumn() {
    return this.db.column !== false
  }

  get isPrimary() {
    if (!isValidPrimaryType) 
      return
    return this.db.primary || (this.value.generate && this.value.unique)
  }

  get isValidPrimaryType() {
    return ['string', 'number', 'integer'].indexOf(this.value.expandedType) >= 0
  }

}
