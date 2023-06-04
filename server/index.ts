/*
 * Copyright 2023 Marek Kobida
 */

import http from 'http';
import { createList, deleteList, lists } from './storage';

const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST, PUT');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'DELETE') {
    /**
     * [DELETE] /list/{listId}
     */
    const pattern = /^\/list\/([0-9]+)$/;

    if (pattern.test(url.pathname)) {
      const [, listId] = pattern.exec(url.pathname)!;

      return response.end(JSON.stringify(deleteList(+listId)));
    }
  }

  if (request.method === 'GET') {
    /**
     * [GET] /list
     */
    if (/^\/list$/.test(url.pathname)) {
      return response.end(JSON.stringify(lists));
    }
  }

  if (request.method === 'POST') {
    /**
     * [POST] /list
     */
    if (/^\/list$/.test(url.pathname)) {
      const name = url.searchParams.get('name');

      if (name) {
        return response.end(JSON.stringify(createList(name)));
      }

      return response.end(JSON.stringify({ error: 'The `name` does not exist.' }));
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => console.log(`http://127.0.0.1:1337/list`));
