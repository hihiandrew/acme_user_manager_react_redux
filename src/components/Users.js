import React, { Component } from 'react';

export default class Users extends Component {
  render() {
    const { users, handleDelete, handleFindManager } = this.props;
    console.log(`users`);
    console.log(users);
    console.log(`map`);
    return (
      <div>
        <ul>
          {users.map(user => {
            console.log(user);
            return (
              <li key={user.name}>
                {user.name}
                {user.managerId ? ` managed by ${handleFindManager(user)}` : ''}
                <div onClick={() => handleDelete(user)}>X</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
