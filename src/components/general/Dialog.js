import React from 'react';

import mobxify from '../hoc/mobxify';
import Modal from './Modal';
import Tappable from './Tappable';

function Dialog({ dialogStore: store }) {
  return (
    <Modal
      title={store.title}
      isOpen={store.isOpen}
    >
      <div className="dialog">
        {store.message && (
          <div className="dialog-message">
            {store.message}
          </div>
        )}
        <div className="dialog-action">
          <Tappable
            className="btn btn-small mgn-r"
            onClick={() => {
              if (store.onCancel) store.onCancel();
              store.close();
            }}
          >
            {store.cancelLabel || 'Cancel'}
          </Tappable>
          {store.onOk && (
            <Tappable
              className="btn btn-small"
              onClick={() => {
                store.onOk();
                store.close();
              }}
            >
              {store.okLabel || 'Ok'}
            </Tappable>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default mobxify('dialogStore')(Dialog);
