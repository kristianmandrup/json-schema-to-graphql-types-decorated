# Properties Resolver

Iterate through the properties map of an `object` and resolve each entry using `PropertyResolver`.

```js
resolve() {
  return Object
    .keys(this.properties)
    .reduce(this.reduceProp.bind(this), {})
}
```

Reduce property

```js
reduceProp(acc, key) {
  const property = this.prepareProperty(key)
  const propertyEntityResolver = createPropertyEntityResolver({property, config: this.config})
  const entity = propertyEntityResolver.resolve()
  acc[key] = entity
  return acc
}
```

Prepare property object to be resolved (to entity) by adding contextual data

```js
prepareProperty(key) {
  const property = this.properties[key]
  // prepare property object
  property.ownerName = this.ownerName
  property.key = key
  return property
}
```
