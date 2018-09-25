# Graph State

The `GraphState` is used to collect entity relationships as a directed graph.

## createModelGraph

Creates a [ModelGraph](./ModelGraph.md) which acts as an adapter of the underlying graph engine

## graph

Access to the model graph instance

## addEdge(from, to, value)

Adds graph edge `from` one node `to` another with `value` to provide information on the edge relationship.

## addOrGetNode(value)

Adds or gets a node given the value (either an object or key)

## hasNode(key)

Checks if the graph has a node with the given key name

## getNode(key)

Retrieves the node with the given key name if present

## hasEdge(from, to)

Checks if the graph has an `from` node `to` node

## getEdge(from, to)

Retrieves the edge marching nodes `from` and `to`

## ensureNode(key, value)

Ensures the node with the `key` is set to the `value` then retrieves it
