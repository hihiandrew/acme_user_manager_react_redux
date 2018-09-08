import { createStore } from 'redux';

const initialState = {
  users: [],
  managers: [{ name: 'moe' }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
    case 'managers':
      return state.managers;
  }
};

const store = createStore(reducer);

export default store;
