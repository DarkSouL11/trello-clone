import React, { Component } from 'react';

import Form from '../form/Form';
import Input from '../form/Input';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

class NewListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      error: false
    };
  }

  submit = e => {
    e.preventDefault();

    const { listsStore: store } = this.props;
    const { title } = this.state;

    try {
      store.addList(title);
      store.setListModalMode(null);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { error, title } = this.state;
    return (
      <Form onSubmit={this.submit}>
        <Input
          autoFocus
          value={title}
          label="Title"
          type="text"
          onChange={value => this.setState({ title: value })}
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
          Add List
        </Tappable>
      </Form>
    );
  }
}

export default mobxify('listsStore')(NewListForm);
