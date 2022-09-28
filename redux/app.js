import {
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
  bindActionCreators
} from "redux";

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

const ADD_USER = "ADD_USER";
const ADD_TASK = "ADD_TASK";

const addTask = (title) => ({ type: ADD_TASK, payload: { title } });
const addUser = (name) => ({ type: ADD_USER, payload: { name } });

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

const reducer = combineReducers({ users, tasks });

const logMiddleware = (store) => (next) => (action) => {
  console.log("Before", store.getState(), { action });
  next(action);
  console.log("After", store.getState(), { action });
};

const store = createStore(reducer, applyMiddleware(logMiddleware));
store.dispatch(addTask("Record the statistics"));
store.dispatch(addUser("Marc"));
