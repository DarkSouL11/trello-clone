import React from 'react';

import EditItemForm from './EditItemForm';
import mobxify from '../hoc/mobxify';
import Modal from '../general/Modal';
import NewItemForm from './NewItemForm';

function ItemModal({ listsStore: store }) {
  function modeTitle() {
    switch (store.itemModalMode) {
      case 'new':
        return 'Add New Task';
      case 'update':
        return 'Update Task';
      default:
        return '';
    }
  }

  function modeUi() {
    switch (store.itemModalMode) {
      case 'new':
        return <NewItemForm {...store.itemModalProps} />;
      case 'update':
        return <EditItemForm {...store.itemModalProps} />;
      default:
        return null;
    }
  }

  return (
    <Modal
      hasCloseButton
      isOpen={store.itemModalMode}
      onClose={() => store.setItemModalMode(null)}
      title={modeTitle()}
    >
      {modeUi()}
    </Modal>
  );
}

export default mobxify('listsStore')(ItemModal);
