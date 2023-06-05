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

let items: Item[] = [
  {
    createdAt: +new Date(),
    id: 0,
    isDone: 0,
    listId: 0,
    text: 'Čerstvé vajcia',
  },
];

function addItem(listId: number, text: string): Item[] {
  //                                        ↓ If there is no last item, the `id` starts from 0.
  const lastItemId = items[items.length - 1]?.id ?? 0;

  return (items = [...items, { createdAt: +new Date(), id: lastItemId + 1, isDone: 0, listId, text }]);
}

function deleteItem(id: number): Item[] {
  return items.filter(item => item.id !== id);
}

function deleteItems(listId: number): Item[] {
  return items.filter(item => item.listId !== listId);
}

function getItems(listId: number): Item[] {
  return items.filter(item => item.listId === listId);
}

export type { Item };
export { addItem, deleteItem, deleteItems, getItems };
