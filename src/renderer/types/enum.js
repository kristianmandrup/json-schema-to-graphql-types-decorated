class EnumRenderer {
  toEnum() {
    return `enum ${this
      .key} {\n  ${this
      .toEnumList()}\n}\n`
  }

  toEnumList() {
    return this
      .values
      .join('\n  ')
  }
}
