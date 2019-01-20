import React from 'react';

import droppableItemTarget from '../hoc/droppableItemTarget';

function DummyItem({
  connectDropTarget,
  position
}) {
  return connectDropTarget(
    <div className="item is-dummy">
      {(position === 0) && <p className="success">Yey, no tasks pending here!</p>}
    </div>
  );
}

export default droppableItemTarget(DummyItem);
