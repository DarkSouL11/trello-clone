import React, { Component } from 'react';

let id = 0;

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || ''
    };
    id += 1;
  }

  handleChange = ({ target: { value } }) => {
    const { onChange } = this.props;
    this.setState(
      { value },
      () => onChange && onChange(value)
    );
  }

  render() {
    const { value } = this.state;
    const { label, type } = this.props;
    return (
      <div className="form-field">
        <label htmlFor={`input_${id}`}>
          <input
            id={`input_${id}`}
            required
            className="form-input"
            type={type}
            value={value}
            onChange={this.handleChange}
          />
          <span className="label">{label}</span>
          <span className="border" />
        </label>
      </div>
    );
  }
}

export default Input;
