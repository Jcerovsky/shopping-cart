/*
 * Copyright 2023 Marek Kobida
 */

import http from 'http';
import { addItem, getItems } from './items';
import { createList, deleteList, lists } from './lists';

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'DELETE') {
    // [DELETE] /list/{listId}
    const pattern = /^\/list\/([0-9]+)$/;

    if (pattern.test(url.pathname)) {
      const [, listId] = pattern.exec(url.pathname)!;

      return response.end(JSON.stringify(deleteList(+listId)));
    }
  }

  if (request.method === 'GET') {
    // [GET] /list
    if (/^\/list$/.test(url.pathname)) {
      return response.end(JSON.stringify(lists));
    }

    // [GET] /list/{listId}/item
    const pattern = /^\/list\/([0-9]+)\/item$/;

    if (pattern.test(url.pathname)) {
      const [, listId] = pattern.exec(url.pathname)!;

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
    const pattern = /^\/list\/([0-9]+)\/item$/;

    if (pattern.test(url.pathname)) {
      const [, listId] = pattern.exec(url.pathname)!;
      const text = url.searchParams.get('text');

      if (text) {
        return response.end(JSON.stringify(addItem(+listId, text)));
      }

      return response.end(JSON.stringify({ error: 'The `text` does not exist.' }));
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => console.log(`http://127.0.0.1:1337/list`));
