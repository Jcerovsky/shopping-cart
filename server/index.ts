/*
 * Copyright 2023 Marek Kobida
 */

import http from 'http';
import { addItem, deleteItem, deleteItems, getItems } from './items';
import { createList, deleteList, getLists } from './lists';
import patterns from './patterns';

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, POST');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'DELETE') {
    // [DELETE] /list/{listId}
    if (patterns.SPECIFIC_LIST.test(url.pathname)) {
      const [, listId] = patterns.SPECIFIC_LIST.exec(url.pathname)!;

      return response.end(JSON.stringify(deleteList(+listId)));
    }

    // [DELETE] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;

      return response.end(JSON.stringify(deleteItems(+listId)));
    }

    // [DELETE] /list/{listId}/item/{itemId}
    if (patterns.SPECIFIC_LIST_ITEM.test(url.pathname)) {
      const [, listId, itemId] = patterns.SPECIFIC_LIST_ITEM.exec(url.pathname)!;

      return response.end(JSON.stringify(deleteItem(+itemId)));
    }
  }

  if (request.method === 'GET') {
    // [GET] /list
    if (/^\/list$/.test(url.pathname)) {
      return response.end(JSON.stringify(getLists()));
    }

    // [GET] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;

      return response.end(JSON.stringify(getItems(+listId)));
    }
  }

  if (request.method === 'POST') {
    // [POST] /list
    if (/^\/list$/.test(url.pathname)) {
      const name = url.searchParams.get('name');

      if (name) {
        return response.end(JSON.stringify(createList(name)));
      }

      return response.end(JSON.stringify({ error: 'The `name` does not exist.' }));
    }

    // [POST] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;
      const text = url.searchParams.get('text');

      if (text) {
        return response.end(JSON.stringify(addItem(+listId, text)));
      }

      return response.end(JSON.stringify({ error: 'The `text` does not exist.' }));
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => console.log(`Server ✅`));
