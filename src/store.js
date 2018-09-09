import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  users: [],
  managers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'load_users':
      const managerIds = [];
      action.users.map(function(user) {
        if (user.managerId) {
          return managerIds.push(user.managerId);
        }
      });
      const listManagers = managerIds.map(id =>
        action.users.find(mgr => mgr.id === id)
      );
      const uniqueManagers = [...new Set(listManagers)];
      return { users: action.users, managers: uniqueManagers };
    case 'del_user':
      const newUsers = state.users.filter(user => user != action.user);
      const newManagers = [];
      if (
        //does the targets manager, manage others?
        newUsers.find(user => user.managerId === action.user.managerId) ===
        undefined
      ) {
        //deletes target and targets manager from managers list
        newManagers.push(
          state.managers.filter(
            manager =>
              manager.id != action.user.managerId && manager != action.user
          )
        );
      } else {
        //delets target from managers list
        newManagers.push(
          state.managers.filter(manager => manager != action.user)
        );
      }
      return { users: newUsers, managers: newManagers };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
