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
  //                                        ↓ if `undefined`
  const lastItemId = items[items.length - 1]?.id ?? 0;

  return (items = [...items, { id: lastItemId + 1, listId, text }]);
}

function getItems(listId: number): Item[] {
  return items.filter(item => item.listId === listId);
}

export { addItem, getItems, items };
