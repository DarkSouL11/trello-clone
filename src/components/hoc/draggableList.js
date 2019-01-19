import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

import { draggableTypes } from '../../utils/constants';

const source = {
  beginDrag({ id }, monitor, component) {
    const node = findDOMNode(component);
    // console.log(node.clientWidth, node.clientHeight);
    return {
      id,
      width: node.clientWidth,
      height: node.clientHeight
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource(draggableTypes.LIST, source, collect);
