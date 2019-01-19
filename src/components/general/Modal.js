import React from 'react';
import classNames from 'classnames';

import Icon from './Icon';
import Tappable from './Tappable';

function Modal({
  hasCloseButton,
  isOpen,
  onClose,
  title,
  ...remainingProps
}) {
  return (
    <div
      className={classNames(
        'modal',
        { 'is-open': isOpen }
      )}
    >
      <div className="modal-layout">
        <div className="modal-header">
          <div className="modal-title">
            {title}
          </div>
          {hasCloseButton && (
            <Tappable className="modal-close btn-round" onClick={onClose}>
              <Icon name="close" />
            </Tappable>
          )}
        </div>
        <div
          className="modal-content"
          {...remainingProps}
        />
      </div>
    </div>
  );
}

export default Modal;
