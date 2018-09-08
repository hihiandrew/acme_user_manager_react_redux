import React, { Component } from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <Router>
        <ul>
          <Link to={'/users'}>
            <li>Users</li>
          </Link>
          <Link to={'/managers'}>
            <li>Managers</li>
          </Link>
          <Link to={'/users/create'}>
            <li>Users Create</li>
          </Link>
        </ul>
      </Router>
    );
  }
}
