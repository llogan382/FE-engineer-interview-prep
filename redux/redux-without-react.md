Some notes from the front end masters course, "Redux Fundamentals".

- [Redux Without React](#redux-without-react)
  - [Create Store](#create-store)
  - [Action Creators](#action-creators)
  - [Setting Initial State](#setting-initial-state)
  - [Dispatch](#dispatch)
  - [Subscribe](#subscribe)
  - [Combine methods](#combine-methods)
  - [Apply Middleware.](#apply-middleware)
- [Redux With React Hooks](#redux-with-react-hooks)
- [HOC-with-connect-api](#hoc-with-connect-api)
- [Redux Toolkit](#redux-toolkit)
- [Asynchronous Actions](#asynchronous-actions)

## Redux Without React

It has mostly just 5 methods, which will all be explored.

1. Apply middleware
2. Create Store
3. Composte
4. Combine Reducers
5. Bind Action Creators

What is the difference between Redux and the UseContext Api?

`redux` uses the react context api to give you access to the Redux Store anywhere in the app.

### Create Store

It has a few methods.
`compose()` is a method attached to the redux object.

It is a way to take many functions, and string them together with just 1 function.

```js
      // Here are three functions.
      const loud = (string) => string.toUpperCase();
      const repeat = (string) => string.repeat(3);
      const embolden = (string) => string.bold();

      // Three functions strung together, like COMPOSE in REDUX:
      const loudBoldRepeat = (string) =>
        embolden(repeat(loud(string)));
```

What are REDUCERS?
Two things go in, and only 1 comes out.
It is a JS object that represents everything in the application, and it keeps track.

These are the four methods in the store:

```js
  dispatch: [Function: dispatch],
  subscribe: [Function: subscribe],
  getState: [Function: getState],
  replaceReducer: [Function: replaceReducer],
  '@@observable': [Function: observable]
```

What is `replaceReducer`?
It takes 1 argument, and swaps it out.
It is used for code splitting.

Imagine having 1 function that updates all functions: It wouldnt scale.

So, you only want to pass in the reducers you want.

the TYPE used in the ACTION is written in caps. Often, the TYPE will be set as a variable so that spelling errors, etc can be caught. Here is an example:

```js
      const INCREMENT = "counter/increment"
      const incrementAction = {type: INCREMENT, payload: 5};


      const reducer = (state, action ) => {
        if (action.type === INCREMENT){
          return {state: state.value + 1}
        }
        return state;
      }
```

### Action Creators

If the action grows, what then? What if there are lots of properties?

It is a fancy word for a function, but it is very powerful.
If you want to modify a function ONE PLACE in your codebase by adding a new function, this is clutch. It only needs to be modified in one place.

Using an action creator allows you to only update the function in 1 place.

Here we are modifying state. an ACTION CREATOR means we only need to add these methods here, not in various places in the codebase.

```js
      const INCREMENT = "counter/increment";
      const ADD = "ADD";

      const incrementAction = {type: INCREMENT, payload: 5};

      const increment = () => ({ type: INCREMENT });
      const add = (number) => ({ type: ADD, payload: number });

      const reducer = (state = initialState, action) => {
        if (action.type === INCREMENT) {
          return { value: state.value + 1 };
        }

        if (action.type === ADD) {
          return { value: state.value + action.payload };
        }

        return state;
      };
```

### Setting Initial State

Remember, this is just Javascript. When creating a reducer, set initial state with a value:

`const reducer = (state = initialState, action) =>`

*Rules for reducers*:
1. No mutating objects. If you touch it, replace it.
2. You must return something.
3. Prefer flat objects (as opposed to nested objects)

### Dispatch

After creating the store, how do we get ACTIONS into the reducer to modify the state?

we DISPATCH them!.

`store.dispatch(action)`

Or, this:
`store.dispatch(increment());`

### Subscribe

It basically "listens" every time the state changes.

When to use this?

When you pass in new-props and keep everything up to date.

`bindActionCreators()` - they use Action Creators which are *functions that create (redux) actions*.

bindActionCreators bind those actions to the dispatch when it is called, so you dont have to keep using `action.type === INCREMENT`, for example.

It isnt required, but it helps to reduce typing *dispatch*:

So this:

```js
      const dispatchIncrement = () => store.dispatch(increment());
      const dispatchAdd = (number) => store.dispatch(add(number));

      dispatchIncrement();
      dispatchAdd();
```

Becomes this:

```js
      const actions = bindActionCreators(
        {
          increment,
          add,
        },
        store.dispatch
      );
      actions.increment();
      console.log(store.getState());
```

### Combine methods

Remember, redux is just objects and functions!

What if `state` gets more complicated than just a single integer?

Here is something simple, just TASKS:
```js
const initialState = {
  users: [
    { id: 1, name: "Steve" },
    { id: 2, name: "Wes" },
  ],
  tasks: [
    { title: "File the TPS reports", assignedTo: 1 },
    { title: "Order more toner for the printer", assignedTo: null },
  ],
};
```

It already gets complicated as we spread the tasks, and users, each time:

```js
const reducer = (state = initialState, action) => {
  if (action.type === ADD_USER) {
    return {
      ...state,
      users: [...state.users, action.payload],
    };
  }

  if (action.type === ADD_TASK) {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    };
  }
};
```

As it grows, it gets complicated. The entire state is being copied multiple times. So can it get split up into multiple models?

What if they could be split to smaller reducers?

How can it be refactored? First we split up the users, take in the state,
```js
const users = (state = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...state, action.payload];
  }

  return state;
};
```

Do the same thing for the tasks;

```js
      const tasks = (state = initialState.tasks, action) => {
        if (action.type === ADD_TASK) {
          return [...state, action.payload];
        }

        return state;
      };
```

Then pull them both together like this:

```js
const reducer = redux.combineReducers({ users, tasks });

const store = createStore(reducer, initialState);
```

Instead of taking the entire state object, you are just defining and updating this one piece of state.

Key rule: Update as often as needed, and as little as possible.

The flatter the object, the easier.

Here is the whole thing together. This is the before (the same thing as above):

```js
const reducer = (state = initialState, action) => {
  if (action.type === ADD_USER) {
    return {
      ...state,
      users: [...state.users, action.payload],
    };
  }

  if (action.type === ADD_TASK) {
    return {
      ...state,
      tasks: [...state.tasks, action.payload],
    };
  }
};
```
Turns into this

```js
const users = (state = initialState.users, action) => {
  if (action.type === ADD_USER) {
    return [...state, action.payload];
  }

  return state;
};

const tasks = (state = initialState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...state, action.payload];
  }

  return state;
};

const reducer = redux.combineReducers({ users, tasks });

const store = createStore(reducer, initialState);
```

This can help tremendously as the application grows.

Can different reducers update the same part of the object?

NO!

### Apply Middleware.

For `createStore`, it only takes 1 required argument: the `reducer` function. Everything else is optional.

What does it do?

It can take *everything* from the store, "do stuff", and then call `createStore`.

The function `applyMiddleware()` is an enhancer, behind the scenes.

What if we wanted to measure performance as an enhancer?

ENHANCER is used if you want to add a lot of functionality to the state.

It is a way to manage ACTIONS as they flow through, and it can be created as an entire CHAIN.

You may not write enhancers, but you will write *middleware*

It gives you the chance to do things **before** and **after** the function reaches the reducer.

An example of middleware is the library `thunk`, used for testing API calls.

It takes any number of arguments that it will string together as 1 enhancer.

Middleware allows you to inspect, modify, and test functions before they resolve and go through the rest of the chain.


## Redux With React Hooks

## HOC-with-connect-api

## Redux Toolkit

## Asynchronous Actions
