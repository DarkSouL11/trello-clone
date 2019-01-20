import React, { Component } from 'react';

import Form from '../form/Form';
import Input from '../form/Input';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

class EditListForm extends Component {
  constructor(props) {
    super(props);
    const { id, listsStore: store } = props;

    this.state = {
      title: store.lists[id].title,
      error: false
    };
  }

  submit = e => {
    e.preventDefault();

    const { listsStore: store, id } = this.props;
    const { title } = this.state;

    try {
      store.editList(id, title);
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
          Update List
        </Tappable>
      </Form>
    );
  }
}

export default mobxify('listsStore')(EditListForm);
