import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  users: [],
  managers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'load_users':
      return handleLoadUser(action);
    case 'del_user':
      return handleDelUser(action, state);
    case 'add_user':
      return handleAddUser(action, state);
    default:
      return state;
  }
};

const handleLoadUser = action => {
  //get list of manager id's
  const managerIds = [];
  action.users.map(function(user) {
    if (user.managerId) {
      return managerIds.push(user.managerId);
    }
  });
  //convert id's into user obj's
  const listManagers = managerIds.map(id =>
    action.users.find(mgr => mgr.id === id)
  );
  //remove duplicates user obj's
  const uniqueManagers = [...new Set(listManagers)];
  return { users: action.users, managers: uniqueManagers };
};

const handleDelUser = (action, state) => {
  //remove target user and if a manager, make managerId null
  const newUsers = state.users
    .filter(user => user != action.user)
    .map(function(user) {
      if (user.managerId === action.user.id) {
        user.managerId = null;
      }
      return user;
    });
  if (
    //does the target's manager, only manage them?
    newUsers.find(user => user.managerId === action.user.managerId) ===
    undefined
  ) {
    //then: delete target and targets manager from managers list
    let newManagers = state.managers.filter(
      manager => manager.id != action.user.managerId && manager != action.user
    );
    return { users: newUsers, managers: newManagers };
  } else {
    //else: only remove target from managers list
    let newManagers = state.managers.filter(manager => manager != action.user);
    return { users: newUsers, managers: newManagers };
  }
};

const handleAddUser = (action, state) => {
  const newUsers = [...state.users, action.user];

  if (action.user.managerId) {
    let newManagers = [...state.managers].push(
      state.users.find(user => user.id === action.user.managerId)
    );
    newManagers = [...new Set(newManagers)];
    return { users: newUsers, managers: newMangers };
  }
  return { users: newUsers, managers: state.managers };
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
