/*
 * Copyright 2023 Marek Kobida
 */

import { get, set } from './gists';
import Items from './items';

interface List {
  createdAt: number;
  id: number;
  name: string;
}

class Lists {
  async createList(name: string): Promise<List> {
    const lists = await this.getLists();

    //                                        ↓ If there is no last list, the `id` starts from 0.
    const lastListId = lists[lists.length - 1]?.id ?? 0;

    const list = { createdAt: +new Date(), id: lastListId + 1, name };

    await this.setLists([...lists, list]);

    return list;
  }

  async deleteList(id: number): Promise<List[]> {
    await Items.deleteItems(id);

    const lists = await this.getLists();

    return this.setLists(lists.filter(list => list.id !== id));
  }

  async getLists(): Promise<List[]> {
    const $ = await get();

    return $.lists;
  }

  async setLists(lists: List[]): Promise<List[]> {
    const $ = await set('lists', lists);

    return $.lists;
  }

  async updateList(id: number, name: string): Promise<List[]> {
    const lists = await this.getLists();

    return this.setLists(lists.map(list => (list.id === id ? { ...list, name } : list)));
  }
}

export default new Lists();
export type { List };
