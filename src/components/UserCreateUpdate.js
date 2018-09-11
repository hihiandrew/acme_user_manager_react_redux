import React, { Component } from 'react';
import store2 from '../store2';
import store from '../store2';

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

  componentDidUpdate() {
    if (this.props.id != 'new' && this.state.prevUser != this.props.user) {
      store2.dispatch({ type: 'set_prev', prevUser: this.props.user });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.props.id === 'new') {
      console.log(this.state.input);
      return this.props.handleAdd({ name: this.state.input });
    }
    return this.props.handleUpdate({ name: this.state.input });
  }

  handleChange(event) {
    store2.dispatch({ type: 'input_change', input: event.target.value });
  }

  render() {
    console.log(this.props);
    const { id } = this.props;
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
