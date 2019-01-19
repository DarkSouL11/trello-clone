import React from 'react';

import EditListForm from './EditListForm';
import mobxify from '../hoc/mobxify';
import Modal from '../general/Modal';
import NewListForm from './NewListForm';

function ListModal({ listsStore: store }) {
  function modeTitle() {
    switch (store.listModalMode) {
      case 'new':
        return 'Add New List';
      case 'update':
        return 'Update Title';
      default:
        return '';
    }
  }

  function modeUi() {
    switch (store.listModalMode) {
      case 'new':
        return <NewListForm {...store.listModalProps} />;
      case 'update':
        return <EditListForm {...store.listModalProps} />;
      default:
        return null;
    }
  }

  return (
    <Modal
      hasCloseButton
      isOpen={store.listModalMode}
      onClose={() => store.setListModalMode(null)}
      title={modeTitle()}
    >
      {modeUi()}
    </Modal>
  );
}

export default mobxify('listsStore')(ListModal);
