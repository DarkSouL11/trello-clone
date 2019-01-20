import items from './items';
import lists from './lists';

function addItem(listId, description) {
  const itemData = items.add(description);
  lists.addItem(listId, itemData.id);
  return itemData;
}

function configure() {
  items.configure();
  lists.configure();
}

function deleteItem(listId, itemId) {
  lists.deleteItem(listId, itemId);
  items.delete(itemId);
}

function deleteList(listId) {
  const list = lists.get().lists[listId];
  list.items.forEach(itemId => deleteItem(listId, itemId));
  return lists.delete(listId);
}

function getData() {
  const { lists: listsData, order } = lists.get();
  const { items: itemsData } = items.get();
  return {
    order,
    lists: listsData,
    items: itemsData
  };
}

const { edit: editItem } = items;

const {
  add: addList,
  edit: editList,
  move: moveList,
  moveItem
} = lists;

export default {
  addItem,
  addList,
  configure,
  deleteItem,
  deleteList,
  editItem,
  editList,
  get: getData,
  moveItem,
  moveList
};
