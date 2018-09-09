import React, { Component } from 'react';

export default class Users extends Component {
  render() {
    const { users, handleDelete, findManager } = this.props;

    return (
      <div>
        <ul>
          {users.map(user => {
            return (
              <li key={user.name}>
                {user.name}
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
