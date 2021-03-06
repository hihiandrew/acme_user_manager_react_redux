import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

const initialState = {
  users: [],
  managers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'load_users':
      return handleLoadUser(action, state);
    case 'del_user':
      return handleDelUser(action, state);
    case 'add_user':
      return handleAddUser(action, state);
    case 'update_user':
      return handleUpdateUser(action, state);
    default:
      return state;
  }
};

const handleUpdateUser = (action, state) => {
  let oldManagerId = 0;

  //swap old user for updated user in user list
  //save oldManagerId for data cleaning
  const newUsers = state.users.map(user => {
    if (user.id === action.user.id) {
      oldManagerId = user.managerId;
      return action.user;
    }
    return user;
  });

  //swap old user if he is in the manager list also
  let newManagers = state.managers.map(manager => {
    if (manager.id === action.user.id) {
      return action.user;
    }
    return manager;
  });
  //check if old manager is no longer a manager
  //check in newUser list to see if old managerId exists
  if (newUsers.find(user => user.managerId == oldManagerId) === undefined) {
    newManagers = newManagers.filter(mgr => mgr.id != oldManagerId);
  }

  //check users manager is a new manager
  //look in the old user list i.e. state.users
  if (
    action.user.managerId &&
    state.managers.find(mgr => mgr.id == action.user.managerId) === undefined
  ) {
    const newMgr = state.users.find(user => user.id == action.user.managerId);
    newManagers = [...newManagers, newMgr];
  }

  return { users: newUsers, managers: newManagers };
};

const handleLoadUser = (action, state) => {
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
  return {
    users: action.users,
    managers: uniqueManagers,
  };
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
    return {
      users: newUsers,
      managers: newManagers,
    };
  } else {
    //else: only remove target from managers list
    let newManagers = state.managers.filter(manager => manager != action.user);
    return {
      users: newUsers,
      managers: newManagers,
    };
  }
};

const handleAddUser = (action, state) => {
  const newUsers = [...state.users, action.user];
  if (action.user.managerId) {
    let newManagers = [
      ...state.managers,
      state.users.find(user => user.id === action.user.managerId),
    ];

    // const uniqueManagers = [...new Set(newManagers)];

    const uniqueManagers = [];
    newManagers.forEach(
      mgr => (uniqueManagers.indexOf(mgr) < 0 ? uniqueManagers.push(mgr) : null)
    );
    return {
      users: newUsers,
      managers: uniqueManagers,
    };
  }
  return {
    users: newUsers,
    managers: state.managers,
  };
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
