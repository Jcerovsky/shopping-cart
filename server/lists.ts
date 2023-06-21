/*
 * Copyright 2023 Marek Kobida
 */

import Items from './items';

interface List {
  createdAt: number;
  id: number;
  name: string;
}

class Lists {
  #lists: List[] = [
    {
      createdAt: +new Date(),
      id: 0,
      name: 'Môj prvý nákupný zoznam',
    },
  ];

  createList(name: string): List {
    //                                                    ↓ If there is no last list, the `id` starts from 0.
    const lastListId = this.#lists[this.#lists.length - 1]?.id ?? 0;

    const list = { createdAt: +new Date(), id: lastListId + 1, name };

    this.#lists = [...this.#lists, list];

    return list;
  }

  deleteList(id: number): List[] {
    Items.deleteItems(id);

    return (this.#lists = this.#lists.filter(list => list.id !== id));
  }

  getLists(): List[] {
    return this.#lists;
  }

  updateList(id: number, name: string): List[] {
    return (this.#lists = this.#lists.map(list => (list.id === id ? { ...list, name } : list)));
  }
}

export default new Lists();
export type { List };
