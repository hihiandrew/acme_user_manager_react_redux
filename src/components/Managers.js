import React, { Component } from 'react';

export default class Managers extends Component {
  constructor() {
    super();
  }

  render() {
    const { managers } = this.props;
    return (
      <ul>
        {managers.map(manager => {
          return <li key={manager.name}>{manager.name}</li>;
        })}
      </ul>
    );
  }
}
