import React from 'react';
import classNames from 'classnames';

function Form({ className, ...remainingProps }) {
  return (
    <form
      className={classNames(
        'form',
        { [className]: className }
      )}
      {...remainingProps}
    />
  );
}

export default Form;
