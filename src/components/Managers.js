import React, { Component } from 'react';
import axios from 'axios';

export default class Managers extends Component {
  constructor() {
    super();
  }

  render() {
    const { managers } = this.props;
    return (
      <ul>
        {managers.map(manager => {
          return <li>{manager.name}</li>;
        })}
      </ul>
    );
  }
}
