Some notes from the front end masters course, "Redux Fundamentals".

- [Redux Without React](#redux-without-react)
  - [Create Store](#create-store)
  - [What are REDUCERS?](#what-are-reducers)
  - [Action Creators](#action-creators)
  - [Setting Initial State](#setting-initial-state)
  - [Dispatch](#dispatch)
  - [Subscribe](#subscribe)
  - [Combine methods](#combine-methods)
  - [Apply Middleware.](#apply-middleware)
- [Redux With React Hooks](#redux-with-react-hooks)
  - [Cant we just change the store?](#cant-we-just-change-the-store)
- [HOC-with-connect-api](#hoc-with-connect-api)
  - [MapStateToProps](#mapstatetoprops)
  - [mapDispatchToProps](#mapdispatchtoprops)
  - [How does state work together?](#how-does-state-work-together)
  - [What do we do when the calculations of the app become complicated?](#what-do-we-do-when-the-calculations-of-the-app-become-complicated)
  - [How to simplify the reducers, so we dont have to spread the state each time?](#how-to-simplify-the-reducers-so-we-dont-have-to-spread-the-state-each-time)
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

It is a way to take many functions, and string them together into just 1 function.

```js
      // Here are three functions.
      const loud = (string) => string.toUpperCase();
      const repeat = (string) => string.repeat(3);
      const embolden = (string) => string.bold();

      // Three functions strung together, like COMPOSE in REDUX:
      const loudBoldRepeat = (string) =>
        embolden(repeat(loud(string)));
```

In redux, we could COMPOSE to re-write the above snippet as follows:

```js
      const makeLouderAndBoldAndRepeatThreeTimes = redux.compose(
        embolden,
        repeatThreeTimes,
        makeLouder
      );
```

### What are REDUCERS?
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

With a reducer, you pass in the current state, and an action, and return the new state.

To say it another way, pass in the old state of the world, and something that happened, and return a new state of the world.

### Action Creators

If the action grows, what then? What if there are lots of properties?

It is a fancy word for a function, but it is very powerful.
If you want to modify a function ONE PLACE in your codebase by adding a new function, this is clutch. It only needs to be modified in one place.

Using an action creator allows you to only update the function in 1 place.

Here we are modifying state. an ACTION CREATOR means we only need to add these methods here, not in various places in the codebase.

```js
      const initialState = { value: 0 };

      const INCREMENT = "INCREMENT";
      const ADD = "ADD";

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

Start out by putting actions into a dir called `actions`

1. Tell react that redux exists
2. Get it to receive state
3. How to dispatch actions.

If the state needs to change formats: do it in the reducer. (like changing number to int not a string).

Between actions, and reducers, we have the store.

In a new file called `actions.js`:

```js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const SET = "SET";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const set = (value) => ({ type: SET, payload: value });
```

Awesome! We have our *types* defined as actions.
Now, we need to use them in our reducers:

Create a new file called `reducer.js`
```js
import { DECREMENT, INCREMENT, SET } from "./actions";

export const initialState = { count: 0 };

export const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    return { count: state.count + 1 };
  }

  if (action.type === DECREMENT) {
    return { count: state.count - 1 };
  }

  if (action.type === SET) {
    return { count: parseInt(action.payload, 10) };
  }

  return state;
};
```

React Redux.

Now we have to create the store:

```js
//Store.js

import { createStore } from "redux";
import { reducer } from "./reducer";

export const store = createStore(reducer);
```

In the app, or `index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; /* 🌝 */

import Application from './Application';
import { store } from './store'; /* 🌝 */

import './index.scss';

ReactDOM.render(
  <Provider store={store}> {/* 🌝 */}
    <React.StrictMode>
      <Application />
    </React.StrictMode>
  </Provider>, {/* 🌝 */}
  document.getElementById('root')
);
```

Boom! Now your app knows about your redux store!

*Add the Store in the Component*
How do we add the store value into the component?

In your component, add this:

```js
import { useSelector } from 'react-redux'; /* 🌝 */

export const Counter = () => {
  const incident = 'Incident';
  const count = useSelector((state) => state.count); {/* 🌝 */}

  return (
    // …
  );
};

export default Counter;
```
Notice how it is only pulling in a part of the state- not the whole state.

Use reducer takes the reducer in that component and gives you state and dispatch.

Use dispatch to get dispatch whenever you need it.

What about the `connect` method?
useSelector is the replacer for mapStatetoProps

useDispatch is the replace for mapDispatchToProps.

If you use the connect api, these hooks are the parallels to it:
```js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { set } from "./actions";

export const SetCounter = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  return (
    <section className="controls">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(set(count));
        }}
      >
        <label htmlFor="set-to">Set Count</label>
        <input
          id="set-to"
          type="number"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
        <input type="submit" />
      </form>
    </section>
  );
};
```

What goes in state?
Things that can go to/from the DB.

View layer? Not in state.
Business logic? Yes.
When they submit a form: yes.

Remember, `dispatch` is the way that we get actions to change the store.

`useSelector` will get things from the state tree.

### Cant we just change the store?

NO. We have access to the STATE: we have use dispatch, and useSelector to get state from the store, but we cannot change the store itself. So, we cant use `subscribe`

`dispatch` will look like a normal function, it will just do a dispatch action in the background.

## HOC-with-connect-api

Connect API Vs. Hooks.
There are drawbacks to hooks: separation of concerns. If you want to test it, tis difficult without bringing the whole store with it.

The connect API wraps components. It lets you wrap presentational (stateless) components. They dont do anythin on their own. You can pass in any data you need.

Drawbacks? Wrapping will being noise to dev tools.
It is harder for type-safety.

It can be harder with storybook.

Both ways are ok.

Goal:
Wrap components in higher order components, and pass in as props.
In each component, create a VIEW and a LOGIC file.

### MapStateToProps

First: remove the hard-coded array, and get STATE from our reducer.

For each prop:
- What do we need to pull in for DISPLAY?
- What do we need to pull in for ACTION CREATORS?

Get them, and pass them in as props.

`connect()` takes the state you want to match and the dispatch, then the component you want to pass them to.

When do we need to add something to state?

When you look at the REDUCER, you see the default state; where do you set default values?

REDUX will let you set defaults in action creators, OR the reducer.

**Recommendation**: put it all in the reducer; this consolidates default values into one place in the codebased.

If you only change the state, sometimes REACT will not re-render. In that case, just refresh the page.

### mapDispatchToProps

If you dont pass any args to connect, it will pass in the full dispatch object.

Dispatch is the same dispatch as the `useDispatch` hook.

It will pass **DISPATCH** as a prop:

```js
import NewItemForm from "../components/NewItemForm";
import {connect} from "react-redux";

export const NewItemFormContainer = connect()(NewItemForm);
```

SO: you can separate the state management from the UI.

If you give mapDispatchToProps, it will call the functions, and pass in Dispatch.

Redux can automatically pass DISPATCH into the object.

1. UseConnect
2. pass function that recieves dispatch
3. give it an object, and Redux does the work on your behalf.

Tips:

- Actions. Keep them as small, with as little data as possible, and put the rest in the reducer. This will help when the codebase grows, and more complex state is added. The rest can be done in the reducer. This helps to keep all items in the same place.

As a recap, here is the ACTION:

An ACTION takes a TYPE and a PAYLOAD. The key here is to keep the action at a minimum, and do all logic/etc in the REDUCER. The ACTION is just a function tht takes something, and returns an object when it is called in the reducer.
From `actions.js`:
```js
export const ITEM_ADDED = "ITEM_ADDED";

export const addNewItem = (name, price) => {
  return {
    type: ITEM_ADDED,
    payload: {
      name,
      price,
    },
  };
};
```

And here is the reducer from `reducer.js`:
```js
export const reducer = (state = initialItems, action) => {
  if (action.type === ITEM_ADDED) {
    const item = { uuid: id++, quantity: 1, ...action.payload };
    return [...state, item];
  }

  return state;
};
```

The reducer checks the action, and does something when that action is called.
The tip is to keep the actions simple: only add the data/info that is required.
Do the logice and everything else in the reducer.
Above, if there is a certain action, the logic is applied.

Using the `connect` api can help scale the app, because `useMemo` and caching are added automatically.

### How does state work together?

Now if you have state in various components, how do you get all the pieces of state working together? Like, in our example of a tip calculator, how do you get the total sum from the various fields?

Answer: Get as little as possible, and calculate it where needed.

Memoize and cache values.

### What do we do when the calculations of the app become complicated?

Use the React shortcuts that are built in- these patterns should be built in.
There is a library that helps with this, checking to see if items in functions and objects changed, called **Reselect**

`createSelector` takes 2 args: an array, and a function to apply to each item.

If the return values are unchanged, it will just return the previous value.

Use these all over the place.
This will help if you need to update the shape of the state tree, you dont need to update all of the items.

Tip: Good abstractions in the beginning help to make things easier later.

Here is the example:

```js
import { createSelector } from "reselect";

export const selectItems = (state) => state.items;
export const selectTipPercentage = (state) => state.tipPercentage;

export const selectSubtotal = createSelector([selectItems], (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

export const selectTipAmount = createSelector(
  [selectSubtotal, selectTipPercentage],
  (subtotal, tipPercentage) => {
    return subtotal * (tipPercentage / 100);
  }
);

export const selectTotal = createSelector(
  [selectSubtotal, selectTipAmount],
  (subtotal, tipAmount) => {
    return subtotal + tipAmount;
  }
);
```

Notice how you can string them together, and build one on top of another.
That way, you can remove much of the state calculations from witin the containers in our app.

### How to simplify the reducers, so we dont have to spread the state each time?

Luckily we have **mutable state with Immer**
What does it look like?

Lets refactor. Here it is before:

```js
  if(action.type === ITEM_ADDED){
    const item = {uuid: id++, quantity: 1, ...action.payload};
    return [...state, item];
  }
```
As the app grows, maintaining this state becomes hard.
Here it is updated:
```js
  if(action.type === ITEM_ADDED){
    produce(state, (draftState) => {
    const item = {uuid: id++, quantity: 1, ...action.payload};
      draftState.push(item)
    })
  }
```

This is an example that is a little more involved: it involved mapping through each time, and that is expensive. We are updating the state as though it was mutable (rather than spreading the object)

```js

  if (action.type === ITEM_PRICE_UPDATED) {
    return state.map(item => {
      if (item.uuid === action.payload.uuid){
        return {...item, price: action.payload.price};
      }
      return item;
    });
  }
```

After:
```js
  if (action.type === ITEM_PRICE_UPDATED) {
    return produce(state, (draftState) => {
      const item = state.find((item) => item.uuid === action.payload.uuid);
      item.price = parseInt(action.payload.uuid, 10);
    })
  }
```
This is still a tedious task. Cant we just pass the whole thing into the reducer?

YES!

Here is an example of the whole REDUCER before:

```js
export const reducer = (state = initialItems, action) => {
  // Check, then mutate the array.
  if(action.type === ITEM_ADDED){
    const item = {uuid: id++, quantity: 1, ...action.payload};
    return [...state, item];
  }
  if (action.type === ITEM_REMOVED) {
    return state.filter((item) => item.uuid !== action.payload.uuid);
  }
  if (action.type === ITEM_PRICE_UPDATED) {
    return state.map(item => {
      if (item.uuid === action.payload.uuid){
        return {...item, price: action.payload.price};
      }
      return item;
    });
  }
  if (action.type === ITEM_QUANTITY_UPDATED) {
    return state.map(item => {
      if (item.uuid === action.payload.uuid){
        return {...item, price: action.payload.price};
      }
      return item;
    });
  }
  return state;
};
```

And AFTER adding IMMER to the whoe reducer:
```js
export const reducer = produce((state = initialItems, action) => {
  if(action.type === ITEM_ADDED){
    const item = {uuid: id++, quantity: 1, ...action.payload};
    state.push(item)
  }
  if (action.type === ITEM_REMOVED) {
    return state.filter((item) => item.uuid !== action.payload.uuid);
  }
  if (action.type === ITEM_PRICE_UPDATED) {
      const item = state.find((item) => item.uuid === action.payload.uuid);
      item.price = parseInt(action.payload.uuid, 10);
    }
  if (action.type === ITEM_QUANTITY_UPDATED) {
      const item = state.find((item) => item.uuid === action.payload.uuid);
      item.quantity = parseInt(action.payload.uuid, 10);
    }
}, initialItems);
```

From 26 lines, to 16 lines.




## Redux Toolkit
This just sits on top of Redux. It provides a lot of shortcuts and "abstractions". It works for many smaller applications. And, it has many concepts that you can apply to your larger, non-toolkit codebases.

It ties up reducers, middleware, etc. It sets it all up for us.

Directory layout depends on what you are building.

what about **slices**?

In a SLICE, you have the reducers (mutating state, which uses `immer` under the hood.)

It makes the actions, stores the action types.





## Asynchronous Actions
