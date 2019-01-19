import localStore from './localStore';

const lsKey = 'api.items';

function configureItems() {
  let lsData = localStore.getItem(lsKey);
  if (!lsData) {
    /**
     * We store items in the below format.
     * `data` - Stores actual item data where key will be `id` of the item and property
     *  will hold the item data.
     * `added` - Total number of items added, used for generating unique id to new items.
     */
    lsData = {
      data: {},
      added: 0
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

function addItem(description) {
  if (!description || description.trim().length < 3) {
    throw new Error('Item description too small!');
  } else {
    const id = getNextId();
    const lsData = localStore.getItem(lsKey);
    const itemData = { description };
    lsData.data[id] = itemData;
    localStore.setItem(lsKey, lsData);
    return { id, ...itemData };
  }
}

function deleteItem(itemId) {
  const lsData = localStore.getItem(lsKey);
  delete lsData.data[itemId];
  localStore.setItem(lsKey, lsData);
}

function editItem(id, description) {
  if (!description || description.trim().length < 3) {
    throw new Error('Item description too small!');
  } else {
    const lsData = localStore.getItem(lsKey);
    lsData.data[id] = { description };
    localStore.setItem(lsKey, lsData);
    return { id, description };
  }
}

function getItems() {
  const { data: items } = localStore.getItem(lsKey);
  return { items };
}

export default {
  add: addItem,
  configure: configureItems,
  delete: deleteItem,
  edit: editItem,
  get: getItems
};
