import React from 'react';

import List from './List';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

function Lists({ listsStore: store }) {
  function listUi(listId, index) {
    return <List key={index} position={index} id={listId} />;
  }

  return (
    <div className="lists-container scroll-h">
      {store.order.map(listUi)}
      <div className="list-new-btn">
        <Tappable
          className="btn"
          onClick={() => store.setListModalMode('new')}
        >
          Add New List
        </Tappable>
      </div>
    </div>
  );
}

export default mobxify('listsStore')(Lists);
