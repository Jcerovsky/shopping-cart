/*
 * Copyright 2023 Marek Kobida
 */

interface Item {
  id: number;
  listId: number;
  text: string;
}

let items: Item[] = [
  {
    id: 0,
    listId: 0,
    text: 'Čerstvé vajcia',
  },
];

function addItem(listId: number, text: string): Item[] {
  //                                        ↓ If there is no last item, the `id` starts from 0.
  const lastItemId = items[items.length - 1]?.id ?? 0;

  return (items = [...items, { id: lastItemId + 1, listId, text }]);
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

export { addItem, deleteItem, deleteItems, getItems, items };
