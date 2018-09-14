import React, { Component } from 'react';
import store2 from '../store2';

export default class UserCreateUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = store2.getState();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSetManager = this.handleSetManager.bind(this);
    this.setFormValues = this.setFormValues.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store2.subscribe(() => this.setState(store2.getState()));
    this.setFormValues();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id != this.props.id) {
      this.setFormValues();
    }
  }

  setFormValues() {
    if (this.props.id == 'new') {
      return store2.dispatch({ type: 'input_change', input: '' });
    }
    return store2.dispatch({
      type: 'input_change',
      input: this.props.user.name,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const managerId = this.state.managerId == 0 ? null : this.state.managerId;

    if (this.props.id === 'new') {
      return this.props.handleAdd({
        name: this.state.input,
        managerId: managerId,
      });
    }

    return this.props.handleUpdate(
      { name: this.state.input, managerId: managerId },
      this.props.id
    );
  }

  handleChange(event) {
    store2.dispatch({ type: 'input_change', input: event.target.value });
  }

  handleSetManager(event) {
    store2.dispatch({ type: 'set_manager', managerId: event.target.value * 1 });
  }

  render() {
    const { id, users } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <select
            name="manager"
            onChange={this.handleSetManager}
            value={this.state.managerId}
          >
            <option value={0}>--none--</option>
            {users.map(mgr => {
              return (
                <option key={mgr.id} value={mgr.id}>
                  {mgr.name}
                </option>
              );
            })}
          </select>
          <button type="submit" disabled={!this.state.input}>
            {id == 'new' ? 'save' : 'update'}
          </button>
        </form>
      </div>
    );
  }
}
