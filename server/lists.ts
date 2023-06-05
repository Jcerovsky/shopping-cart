/*
 * Copyright 2023 Marek Kobida
 */

import { deleteItems } from './items';

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

function createList(name: string): List[] {
  //                                        ↓ If there is no last list, the `id` starts from 0.
  const lastListId = lists[lists.length - 1]?.id ?? 0;

  return (lists = [...lists, { createdAt: +new Date(), id: lastListId + 1, name }]);
}

function deleteList(id: number): List[] {
  deleteItems(id);

  return (lists = lists.filter(list => list.id !== id));
}

function getLists(): List[] {
  return lists;
}

export type { List };
export { createList, deleteList, getLists };
