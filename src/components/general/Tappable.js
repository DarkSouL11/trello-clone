import React from 'react';
import classNames from 'classnames';

function Tappable({
  className,
  component,
  ...remainingProps
}) {
  return React.createElement(
    component || 'a',
    {
      className: classNames( 'tappable', { [className]: className }),
      ...remainingProps
    }
  )
}

export default Tappable;