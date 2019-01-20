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
  editItem,
  editList,
  get: getData,
  moveItem,
  moveList
};
