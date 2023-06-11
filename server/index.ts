/*
 * Copyright 2023 Marek Kobida
 */

import http from 'http';
import common from '../common';
import { addItem, deleteItem, deleteItems, getItems, updateItem } from './items';
import { createList, deleteList, getLists, updateList } from './lists';
import patterns from './patterns';

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'DELETE') {
    // [DELETE] /list/{listId}
    if (patterns.SPECIFIC_LIST.test(url.pathname)) {
      const [, listId] = patterns.SPECIFIC_LIST.exec(url.pathname)!;

      deleteList(+listId);

      return response.end();
    }

    // [DELETE] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;

      deleteItems(+listId);

      return response.end();
    }

    // [DELETE] /list/{listId}/item/{itemId}
    if (patterns.SPECIFIC_LIST_ITEM.test(url.pathname)) {
      const [, listId, itemId] = patterns.SPECIFIC_LIST_ITEM.exec(url.pathname)!;

      deleteItem(+itemId);

      return response.end();
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

  if (request.method === 'PATCH') {
    if (patterns.SPECIFIC_LIST.test(url.pathname)) {
      const [, listId] = patterns.SPECIFIC_LIST.exec(url.pathname)!;
      const name = url.searchParams.get('name');

      if (name) {
        updateList(+listId, name);

        return response.end();
      }
    }

    if (patterns.SPECIFIC_LIST_ITEM.test(url.pathname)) {
      const [, listId, itemId] = patterns.SPECIFIC_LIST_ITEM.exec(url.pathname)!;
      const isDone = url.searchParams.get('isDone');

      if (isDone) {
        updateItem(+itemId, +isDone);

        return response.end();
      }
    }
  }

  if (request.method === 'POST') {
    // [POST] /list
    if (/^\/list$/.test(url.pathname)) {
      const name = url.searchParams.get('name');

      if (name) {
        return response.end(JSON.stringify(createList(name).id));
      }
    }

    // [POST] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;
      const text = url.searchParams.get('text');

      if (text) {
        return response.end(JSON.stringify(addItem(+listId, text).id));
      }
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => console.log(`${common.SERVER_URL}/list`));
