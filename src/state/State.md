# State

The state is used to collect entity data from the schema resolvers.

## onEvent(event)

Used to process incoming events (usually received from the [Dispatcher](../dispatcher/Dispatcher.md))

The events can be unpackaged to reveal the event `sender` and `payload`.
Taking the information into account, one or more actions on the state can be executed.

## types

Access to the `types` collection of the state

## enums

Access to the `enums` collection of the state

## get(key, type)

Get a node (entity) of a given name of a given `type`

## mapFor(type)

et the state collection (map) for a given node (entity) type

## add(obj, type)

Add an object of a certain `type` to the state

## addRef($from, $to, refType = 'type')

Add a reference (edge) from one node (entity) to another node (entity) with a reference type `refType` (by default `type`)

## ensure(value, type)

Ensures value fot the type is set and retrieves it
