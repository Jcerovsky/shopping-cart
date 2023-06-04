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
  const lastList = lists[lists.length - 1];

  return (lists = [...lists, { id: lastList.id + 1, name }]);
}

function deleteList(id: number): List[] {
  return (lists = lists.filter(list => list.id !== id));
}

export { createList, deleteList, lists };
