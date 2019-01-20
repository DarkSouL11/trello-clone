import { action, extendObservable, observable } from 'mobx';

import api from '../api';
import { removeElement } from '../utils/array';

class ListStore {
  constructor() {
    extendObservable(this, {
      lists: null,
      items: null,
      order: observable([]),

      listModalMode: null,
      listModalProps: {},
      setListModalMode: action((mode, modalProps) => {
        this.listModalMode = mode;
        this.listModalProps = modalProps;
      }),

      itemModalMode: null,
      itemModalProps: {},
      setItemModalMode: action((mode, modalProps) => {
        this.itemModalMode = mode;
        this.itemModalProps = modalProps;
      }),

      load: action(() => {
        const { items, lists, order } = api.get();
        this.items = items;
        this.lists = lists;
        this.order = order;
      }),

      addItem: action((listId, description) => {
        const { id, ...itemData } = api.addItem(listId, description);
        this.items[id] = itemData;
        this.lists[listId].items.push(id);
      }),

      addList: action(title => {
        const { id, ...listData } = api.addList(title);
        this.lists[id] = listData;
        this.order.push(id);
      }),

      deleteItem: action((listId, itemId) => {
        api.deleteItem(listId, itemId);
        removeElement(this.lists[listId].items, itemId);
        delete this.items[itemId];
      }),

      editItem: action((itemId, description) => {
        const { id, ...itemData } = api.editItem(itemId, description);
        this.items[id] = itemData;
      }),

      editList: action((listId, title) => {
        const { id, ...listData } = api.editList(listId, title);
        this.lists[id] = listData;
      }),

      moveItem: action((source, target) => {
        const { list1, list2 } = api.moveItem(source, target);
        const { id: id1, ...listData1 } = list1;
        const { id: id2, ...listData2 } = list2;

        this.lists[id1] = listData1;
        this.lists[id2] = listData2;
      }),

      moveList: action((listId, newPos) => {
        const newOrder = api.moveList(listId, newPos);
        this.order = newOrder;
      })
    });
  }

  getListIdOfItem(itemId) {
    let itemListId;

    this.order.some(listId => {
      const { items } = this.lists[listId];
      if (items.includes(itemId)) {
        itemListId = listId;
        return true;
      } else {
        return false;
      }
    });
    return itemListId;
  }
}

export default new ListStore();
