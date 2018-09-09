import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

export default class Users extends Component {
  render() {
    const { users, handleDelete, findManager } = this.props;

    return (
      <div>
        <ul>
          {users.map(user => {
            return (
              <li key={user.name}>
                <Link to={`user/create/${user.id}`}>{user.name}</Link>
                {user.managerId ? ` managed by ${findManager(user)}` : ''}
                <div onClick={() => handleDelete(user)}>X</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
