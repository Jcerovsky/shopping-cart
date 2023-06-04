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
  //                                        ↓ If there is no last list, the `id` starts from 0.
  const lastListId = lists[lists.length - 1]?.id ?? 0;

  return (lists = [...lists, { id: lastListId + 1, name }]);
}

function deleteList(id: number): List[] {
  return (lists = lists.filter(list => list.id !== id));
}

export { createList, deleteList, lists };
