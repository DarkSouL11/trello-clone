import React from 'react';
import classNames from 'classnames';
import compose from 'lodash/fp/compose';

import draggableList from '../hoc/draggableList';
import droppableListTarget from '../hoc/droppableListTarget';
import Icon from '../general/Icon';
import Item from '../item/Item';
import mobxify from '../hoc/mobxify';
import Tappable from '../general/Tappable';

function List({
  connectDragSource,
  connectDropTarget,
  id,
  isDragging,
  isOver,
  listsStore: store
}) {
  const list = store.lists[id];

  function itemUi(itemId, index) {
    return <Item key={index} id={itemId} listId={id} />;
  }

  return connectDropTarget(
    connectDragSource(
      <div
        className={classNames(
          'list draggable',
          { 'is-moving': isDragging },
          { 'indicate-drop': isOver }
        )}
      >
        <div className="list-info">
          <div className="list-title">{list.title}</div>
          <div className="list-action">
            <Tappable
              className="btn-round"
              onClick={() => store.setListModalMode('update', { id })}
            >
              <Icon name="edit" />
            </Tappable>
          </div>
        </div>
        <div className="list-items scroll">
          {list.items.map(itemUi)}
        </div>
        <Tappable
          className="btn mgn-t"
          onClick={() => store.setItemModalMode('new', { listId: id })}
        >
          Add New Task
        </Tappable>
      </div>
    )
  );
}

const hoc = compose(
  droppableListTarget,
  draggableList,
  mobxify('listsStore')
);

export default hoc(List);
