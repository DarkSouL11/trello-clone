import { DragSource } from 'react-dnd';

import { draggableTypes } from '../../utils/constants';

const source = {
  beginDrag({ id }) {
    return { id };
  },

  isDragging({ id }, monitor) {
    return id === monitor.getItem().id;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(draggableTypes.ITEM, source, collect);
