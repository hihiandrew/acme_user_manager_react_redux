import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    const { users, managers } = this.props.state;
    return (
      <Router>
        <ul>
          <Link to={'/users'}>
            <li>Users ({users.length})</li>
          </Link>
          <Link to={'/managers'}>
            <li>Managers ({managers.length})</li>
          </Link>
          <Link to={'/users/create'}>
            <li>Users Create</li>
          </Link>
        </ul>
      </Router>
    );
  }
}
