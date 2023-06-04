/*
 * Copyright 2023 Marek Kobida
 */

interface List {
  id: number;
  name: string;
}

let lists: List[] = [
  {
    id: 0,
    name: 'Môj prvý nákupný zoznam',
  },
];

function createList(name: string): List[] {
  //                                        ↓ if `undefined`
  const lastListId = lists[lists.length - 1]?.id ?? 0;

  return (lists = [...lists, { id: lastListId + 1, name }]);
}

function deleteList(id: number): List[] {
  return (lists = lists.filter(list => list.id !== id));
}

export { createList, deleteList, lists };

// —————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

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
