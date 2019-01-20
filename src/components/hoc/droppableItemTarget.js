import { DropTarget } from 'react-dnd';

import { draggableTypes } from '../../utils/constants';
import listsStore from '../../stores/listsStore';

const target = {
  canDrop() {
    return false;
  },

  hover({ listId, id, position }, monitor) {
    const sourceId = monitor.getItem().id;
    const dragSource = {
      itemId: sourceId,
      listId: listsStore.getListIdOfItem(sourceId)
    };
    const dropTarget = { listId, position };

    if (dragSource.itemId === id) {
      return;
    }

    listsStore.moveItem(dragSource, dropTarget);
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default DropTarget(draggableTypes.ITEM, target, collect);
