/*
 * Copyright 2023 Marek Kobida
 */

interface Item {
  createdAt: number;
  id: number;
  isDone: number;
  listId: number;
  text: string;
}

class Items {
  #items: Item[] = [
    {
      createdAt: +new Date(),
      id: 0,
      isDone: 0,
      listId: 0,
      text: 'Čerstvé vajcia',
    },
  ];

  addItem(listId: number, text: string): Item {
    //                                                    ↓ If there is no last item, the `id` starts from 0.
    const lastItemId = this.#items[this.#items.length - 1]?.id ?? 0;

    const item = { createdAt: +new Date(), id: lastItemId + 1, isDone: 0, listId, text };

    this.#items = [...this.#items, item];

    return item;
  }

  deleteItem(id: number): Item[] {
    return (this.#items = this.#items.filter(item => item.id !== id));
  }

  deleteItems(listId: number): Item[] {
    return (this.#items = this.#items.filter(item => item.listId !== listId));
  }

  getItems(listId: number): Item[] {
    return this.#items.filter(item => item.listId === listId);
  }

  updateItem(id: number, isDone: number): Item[] {
    return (this.#items = this.#items.map(item => (item.id === id ? { ...item, isDone } : item)));
  }
}

export default new Items();
export type { Item };
