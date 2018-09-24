# ObjectSchema

`ObjectSchema` resolves an `object` or a full `schema`.

- validate it is a valid JSON schema `object`
- If full schema: normalize `required` list of schema properties into each individual property
- create and resolve properties

## Validate

Must have `properties` object and have `type: :'object'`

## Normalize

Normalize `required` list from schema to add as `required` entry in each object property.

## Create and resolve properties

```js
const object = {
  ownerName: name,
  properties: this.properties
};
const properties = createProperties({ object, config });
return properties.resolve();
```
