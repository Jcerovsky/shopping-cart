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

const items: Item[] = [
  {
    id: 0,
    listId: 0,
    text: 'Čerstvé vajcia',
  },
];

export { items };
