import { DropTarget } from 'react-dnd';

import { draggableTypes } from '../../utils/constants';
import listsStore from '../../stores/listsStore';

const target = {
  drop({ position }, monitor) {
    const { id: draggedListId } = monitor.getItem();
    listsStore.moveList(draggedListId, position);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    item: monitor.getItem()
  };
}

export default DropTarget(draggableTypes.LIST, target, collect);
