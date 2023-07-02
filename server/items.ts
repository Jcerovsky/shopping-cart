/*
 * Copyright 2023 Marek Kobida
 */

import { get, set } from './gists';

interface Item {
  createdAt: number;
  id: number;
  isDone: number;
  listId: number;
  text: string;
}

class Items {
  async addItem(listId: number, text: string): Promise<Item> {
    const items = await this.getItems();

    //                                        ↓ If there is no last item, the `id` starts from 0.
    const lastItemId = items[items.length - 1]?.id ?? 0;

    const item = { createdAt: +new Date(), id: lastItemId + 1, isDone: 0, listId, text };

    await this.setItems([...items, item]);

    return item;
  }

  async deleteItem(id: number): Promise<Item[]> {
    const items = await this.getItems();

    return this.setItems(items.filter(item => item.id !== id));
  }

  async deleteItems(listId: number): Promise<Item[]> {
    const items = await this.getItems();

    return this.setItems(items.filter(item => item.listId !== listId));
  }

  async getItems(listId?: number): Promise<Item[]> {
    const $ = await get();

    if (listId !== undefined) {
      return $.items.filter(item => item.listId === listId);
    }

    return $.items;
  }

  async setItems(items: Item[]): Promise<Item[]> {
    const $ = await set('items', items);

    return $.items;
  }

  async updateItem(id: number, isDoneOrText: number | string): Promise<Item[]> {
    const columnName = typeof isDoneOrText === 'number' ? 'isDone' : 'text';

    const items = await this.getItems();

    return this.setItems(items.map(item => (item.id === id ? { ...item, [columnName]: isDoneOrText } : item)));
  }
}

export default new Items();
export type { Item };
