/*
 * Copyright 2023 Marek Kobida
 */

import Items from './items';

interface List {
  createdAt: number;
  id: number;
  name: string;
}

let lists: List[] = [
  {
    createdAt: +new Date(),
    id: 0,
    name: 'Môj prvý nákupný zoznam',
  },
];

function createList(name: string): List {
  //                                        ↓ If there is no last list, the `id` starts from 0.
  const lastListId = lists[lists.length - 1]?.id ?? 0;

  const list = { createdAt: +new Date(), id: lastListId + 1, name };

  lists = [...lists, list];

  return list;
}

function deleteList(id: number): List[] {
  Items.deleteItems(id);

  return (lists = lists.filter(list => list.id !== id));
}

function getLists(): List[] {
  return lists;
}

function updateList(id: number, name: string): List[] {
  return (lists = lists.map(list => (list.id === id ? { ...list, name } : list)));
}

export type { List };
export { createList, deleteList, getLists, updateList };
