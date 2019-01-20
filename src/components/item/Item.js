import React from 'react';
import classNames from 'classnames';
import compose from 'lodash/fp/compose';

import draggableItem from '../hoc/draggableItem';
import droppableItemTarget from '../hoc/droppableItemTarget';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

function Item({
  connectDragSource,
  connectDropTarget,
  dialogStore,
  id,
  isDragging,
  listId,
  listsStore: store
}) {
  const item = store.items[id];

  return connectDropTarget(connectDragSource(
    <div
      className={classNames(
        'item draggable',
        { 'is-moving': isDragging }
      )}
    >
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
  ));
}

const hoc = compose(
  droppableItemTarget,
  draggableItem,
  mobxify('dialogStore', 'listsStore')
);


export default hoc(Item);
