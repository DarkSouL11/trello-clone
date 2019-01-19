import React from 'react';

import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

function Item({
  dialogStore,
  id,
  listId,
  listsStore: store
}) {
  const item = store.items[id];

  return (
    <div className="item">
      <div className="item-desc">
        {item.description}
      </div>
      <div className="item-action">
        <Tappable
          className="btn btn-danger btn-small mgn-r"
          onClick={() => dialogStore.areYouSure({
            message: 'Proceeding will delete this task and it can\'t be undone.',
            onOk: () => store.deleteItem(listId, id)
          })}
        >
          Delete
        </Tappable>
        <Tappable
          className="btn btn-small"
          onClick={() => store.setItemModalMode('update', { itemId: id })}
        >
          Edit
        </Tappable>
      </div>
    </div>
  );
}

export default mobxify('dialogStore', 'listsStore')(Item);
