import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  input: '',
  managerId: 0,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'input_change':
      return {
        input: action.input,
        managerId: action.managerId,
      };
    case 'set_prev':
      return {
        input: action.prevUser.name,
        managerId: state.managerId,
      };
    case 'set_manager':
      return {
        input: state.input,
        managerId: action.managerId,
      };
    default:
      return state;
  }
};

const store2 = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store2;
