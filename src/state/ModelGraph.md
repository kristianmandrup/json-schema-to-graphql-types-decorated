# Model Graph

Used by [GraphState](./GraphState.md) as a facade/adapter to the underlying Graph "engine".

## Naming

In order to ensure against name collisions or different entities, we should make the API add the type name as a prefix such as `type:Car` and `primitive:car`

## methods

### addEdge(from, to, value)

### addOrGetNode(value)

### hasNode(key)

### getNode(key)

### hasEdge(from, to)

### getEdge(from, to)

### ensureNode(key, value)
