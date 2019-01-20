import React, { Component } from 'react';

import Form from '../form/Form';
import Input from '../form/Input';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

class NewItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: false
    };
  }

  submit = e => {
    e.preventDefault();

    const { listsStore: store, listId } = this.props;
    const { description } = this.state;

    try {
      store.addItem(listId, description);
      store.setItemModalMode(null);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { error, description } = this.state;
    return (
      <Form onSubmit={this.submit}>
        <Input
          autoFocus
          value={description}
          label="Description"
          type="text"
          onChange={value => this.setState({ description: value })}
        />
        {error && (
          <div className="form-error">
            {error}
          </div>
        )}
        <Tappable
          component="button"
          className="btn"
          type="submit"
        >
          Add Task
        </Tappable>
      </Form>
    );
  }
}

export default mobxify('listsStore')(NewItemForm);
