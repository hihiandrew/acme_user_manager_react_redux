import React, { Component } from 'react';
import store2 from '../store2';

export default class UserCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = store2.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store2.subscribe(() => this.setState(store2.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.id === 'create') {
      return this.props.handleAdd({ name: this.state.input });
    }
    return this.props.handleUpdate({ name: this.state.input });
  }

  handleChange(event) {
    store2.dispatch({ type: 'input_change', input: event.target.value });
  }

  render() {
    console.log(this.props);
    const { user, id } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type="submit" disabled={!this.state.input}>
            {id == 'create' ? 'save' : 'update'}
          </button>
        </form>
      </div>
    );
  }
}
