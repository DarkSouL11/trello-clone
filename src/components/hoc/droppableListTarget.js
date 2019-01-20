import { DropTarget } from 'react-dnd';

import { draggableTypes } from '../../utils/constants';
import listsStore from '../../stores/listsStore';

const target = {
  canDrop() {
    return false;
  },

  hover({ position }, monitor) {
    const { id: draggedListId } = monitor.getItem();
    listsStore.moveList(draggedListId, position);
  }
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default DropTarget(draggableTypes.LIST, target, collect);
