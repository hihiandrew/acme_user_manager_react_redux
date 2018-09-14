import React, { Component } from 'react';
import Navbar from './Navbar';
import { HashRouter as Router, Route } from 'react-router-dom';
import Managers from './Managers';
import Users from './Users';
import UserCreateUpdate from './UserCreateUpdate';
import store from '../store';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.handleDelete = this.handleDelete.bind(this);
    this.findManager = this.findManager.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    axios
      .get('/api/users')
      .then(resp => {
        store.dispatch({ type: 'load_users', users: resp.data });
      })
      .catch(e => console.log(e));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleDelete(user) {
    axios
      .delete(`/api/users/${user.id}`)
      .then(() => {
        store.dispatch({ type: 'del_user', user });
      })
      .catch(e => console.log(e));
  }

  findManager(user) {
    return this.state.managers.find(manager => manager.id === user.managerId)
      .name;
  }

  handleAdd(user) {
    axios
      .post('/users/create', user)
      .then(resp => {
        store.dispatch({ type: 'add_user', user: resp.data });
      })
      .catch(e => console.log(e));
  }

  handleUpdate(user, id) {
    axios
      .put(`/users/create/${id}`, user)
      .then(resp => {
        console.log(resp.data);
        store.dispatch({ type: 'update_user', user: resp.data });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar state={this.state} />
          <Route
            exact
            path={'/managers'}
            render={() => {
              return <Managers managers={this.state.managers} />;
            }}
          />
          <Route
            path={'/users'}
            render={() => {
              return (
                <Users
                  users={this.state.users}
                  handleDelete={this.handleDelete}
                  findManager={this.findManager}
                />
              );
            }}
          />
          <Route
            path={'/users/create/:id'}
            render={({ location }) => {
              const id = location.pathname.split('/').pop();
              const user = this.state.users.find(user => user.id == id);
              return (
                <UserCreateUpdate
                  id={id}
                  user={user}
                  users={this.state.users}
                  handleAdd={this.handleAdd}
                  handleUpdate={this.handleUpdate}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}
