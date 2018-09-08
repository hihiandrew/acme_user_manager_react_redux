import React, { Component } from 'react';
import Navbar from './Navbar';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Managers from './Managers';
import store from '../store';

export default class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route
            exact
            path={'/managers'}
            render={() => {
              return <Managers managers={this.state.managers} />;
            }}
          />
        </div>
      </Router>
    );
  }
}
