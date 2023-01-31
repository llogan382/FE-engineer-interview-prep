 - [extracting state into logic reducer](#extracting-state-into-logic-reducer)

# Extracting State into Logic reducer.

# Structuring State

## Principles for structuring state.

How do we structure state to be as optimal as possible?

1. Group related state. If two variables are updated at the same time, consider merging them into the same piece of state. This can be something like open modal/close, and submit form, or something like that.
2. Avoid contradictions. Can any of the pieces of state "oppose", or work against another piece (they cannot be either/or at the same time).
3. Can it be calculated? If it can be calculated from the props, it should not be put into the components state.
4. Dont duplicate. If the same data is used in various places, or nested, it cant remain in sync.
