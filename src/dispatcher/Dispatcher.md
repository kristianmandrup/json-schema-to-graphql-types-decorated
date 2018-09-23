# Dispatcher

Can be used to control dispatching of events to the State manager.

## dispatch

Takes an event with `sender` and `payload` (object)
The receiver (by default `state`) is responsible for unpacking the `payload` and using it.
