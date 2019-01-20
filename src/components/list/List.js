import React from 'react';
import classNames from 'classnames';
import compose from 'lodash/fp/compose';

import draggableList from '../hoc/draggableList';
import droppableListTarget from '../hoc/droppableListTarget';
import Icon from '../general/Icon';
import Item from '../item/Item';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';
import DummyItem from '../item/DummyItem';

function List({
  connectDragSource,
  connectDropTarget,
  dialogStore,
  id,
  isDragging,
  listsStore: store
}) {
  const list = store.lists[id];

  function itemUi(itemId, index) {
    return <Item key={index} id={itemId} listId={id} position={index} />;
  }

  return connectDropTarget(connectDragSource(
    <div
      className={classNames(
        'list draggable',
        { 'is-moving': isDragging }
      )}
    >
      <div className="list-info">
        <div className="list-title">{list.title}</div>
        <div className="list-action">
          <Tappable
            className="btn btn-inverted btn-danger btn-small mgn-r"
            onClick={() => dialogStore.areYouSure({
              message: `Proceeding will delete the list and all the tasks in it.
              It can't be undone.`,
              onOk: () => store.deleteList(id)
            })}
          >
            <Icon name="delete" />
          </Tappable>
          <Tappable
            className="btn btn-inverted btn-small"
            onClick={() => store.setListModalMode('update', { id })}
          >
            <Icon name="edit" />
          </Tappable>
        </div>
      </div>
      <div className="list-items scroll">
        {list.items.map(itemUi)}
        <DummyItem position={list.items.length} id={-1} listId={id} />
      </div>
      <Tappable
        className="btn mgn-t"
        onClick={() => store.setItemModalMode('new', { listId: id })}
      >
        Add New Task
      </Tappable>
    </div>
  ));
}

const hoc = compose(
  droppableListTarget,
  draggableList,
  mobxify('dialogStore', 'listsStore')
);

export default hoc(List);
