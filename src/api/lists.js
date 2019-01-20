import { insertElement, removeElement } from '../utils/array';
import localStore from './localStore';

const lsKey = 'api.lists';

function configureLists() {
  let lsData = localStore.getItem(lsKey);
  if (!lsData) {
    /**
     * We store lists in the below format.
     * `order` - Represents the sort order of lists, each element is id of the list.
     * `data` - Stores actual list data.
     * `added` - Total number of lists added, used for generating unique id to new lists.
     */
    lsData = {
      order: [1, 2],
      data: {
        1: {
          title: 'To do',
          items: []
        },
        2: {
          title: 'In progress',
          items: []
        }
      },
      added: 2
    };
    localStore.setItem(lsKey, lsData);
  }
}

function getNextId() {
  const lsData = localStore.getItem(lsKey);
  lsData.added += 1;
  localStore.setItem(lsKey, lsData);
  return lsData.added;
}

function addList(title) {
  if (!title || title.trim().length < 3) {
    throw new Error('List title too small!');
  } else {
    const id = getNextId();
    const lsData = localStore.getItem(lsKey);
    const listData = { title, items: [] };
    lsData.data[id] = listData;
    lsData.order.push(id);
    localStore.setItem(lsKey, lsData);
    return { id, ...listData };
  }
}

function addItemToList(listId, itemId) {
  const lsData = localStore.getItem(lsKey);
  lsData.data[listId].items.push(itemId);
  localStore.setItem(lsKey, lsData);
}

function deleteItemFromList(listId, itemId) {
  const lsData = localStore.getItem(lsKey);
  removeElement(lsData.data[listId].items, itemId);
  localStore.setItem(lsKey, lsData);
}

function editList(id, title) {
  if (!title || title.trim().length < 3) {
    throw new Error('List title too small!');
  } else {
    const lsData = localStore.getItem(lsKey);
    lsData.data[id].title = title;
    localStore.setItem(lsKey, lsData);
    return { id, ...lsData.data[id] };
  }
}

function getList() {
  const { data: lists, order } = localStore.getItem(lsKey);
  return { lists, order };
}

function moveItem(source, target) {
  const lsData = localStore.getItem(lsKey);

  const sourceItems = lsData.data[source.listId].items;
  removeElement(sourceItems, source.itemId);

  const targetItems = lsData.data[target.listId].items;
  insertElement(targetItems, source.itemId, target.position);

  localStore.setItem(lsKey, lsData);

  return {
    list1: { id: source.listId, ...lsData.data[source.listId] },
    list2: { id: target.listId, ...lsData.data[target.listId] }
  };
}

function moveList(listToMoveId, newPosition) {
  const lsData = localStore.getItem(lsKey);
  removeElement(lsData.order, listToMoveId);
  insertElement(lsData.order, listToMoveId, newPosition);
  localStore.setItem(lsKey, lsData);
  return lsData.order;
}

export default {
  add: addList,
  addItem: addItemToList,
  configure: configureLists,
  deleteItem: deleteItemFromList,
  edit: editList,
  get: getList,
  move: moveList,
  moveItem
};
