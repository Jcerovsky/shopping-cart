/*
 * Copyright 2023 Marek Kobida
 */

import fs from 'fs';
import http from 'http';
import Items from './items';
import Lists from './lists';
import pagination from './pagination';
import patterns from './patterns';

const server = http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, PATCH, POST');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'DELETE') {
    // [DELETE] /list/{listId}
    if (patterns.SPECIFIC_LIST.test(url.pathname)) {
      const [, listId] = patterns.SPECIFIC_LIST.exec(url.pathname)!;

      await Lists.deleteList(+listId);

      return response.end();
    }

    // [DELETE] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;

      await Items.deleteItems(+listId);

      return response.end();
    }

    // [DELETE] /list/{listId}/item/{itemId}
    if (patterns.SPECIFIC_LIST_ITEM.test(url.pathname)) {
      const [, listId, itemId] = patterns.SPECIFIC_LIST_ITEM.exec(url.pathname)!;

      await Items.deleteItem(+itemId);

      return response.end();
    }
  }

  if (request.method === 'GET') {
    // [GET] /list
    if (/^\/list$/.test(url.pathname)) {
      const $ = pagination(await Lists.getLists(), url);

      if ($) {
        return response.end(JSON.stringify($));
      }

      return response.end(JSON.stringify(await Lists.getLists()));
    }

    // [GET] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;

      const $ = pagination(await Items.getItems(+listId), url);

      if ($) {
        return response.end(JSON.stringify($));
      }

      return response.end(JSON.stringify(await Items.getItems(+listId)));
    }
  }

  if (request.method === 'PATCH') {
    if (patterns.SPECIFIC_LIST.test(url.pathname)) {
      const [, listId] = patterns.SPECIFIC_LIST.exec(url.pathname)!;
      const name = url.searchParams.get('name');

      if (name) {
        await Lists.updateList(+listId, name);

        return response.end();
      }
    }

    if (patterns.SPECIFIC_LIST_ITEM.test(url.pathname)) {
      const [, listId, itemId] = patterns.SPECIFIC_LIST_ITEM.exec(url.pathname)!;
      const isDone = url.searchParams.get('isDone');
      const text = url.searchParams.get('text');

      if (isDone) {
        await Items.updateItem(+itemId, +isDone);
        return response.end();
      }

      if (text) {
        await Items.updateItem(+itemId, text);
        return response.end();
      }
    }
  }

  if (request.method === 'POST') {
    // [POST] /list
    if (/^\/list$/.test(url.pathname)) {
      const name = url.searchParams.get('name');

      if (name) {
        return response.end(JSON.stringify((await Lists.createList(name)).id));
      }
    }

    // [POST] /list/{listId}/item
    if (patterns.LIST_ITEMS.test(url.pathname)) {
      const [, listId] = patterns.LIST_ITEMS.exec(url.pathname)!;
      const text = url.searchParams.get('text');

      if (text) {
        return response.end(JSON.stringify((await Items.addItem(+listId, text)).id));
      }
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => {
  let text = fs.readFileSync('./README.md').toString();

  text = text
    .split('\n')
    .filter(($, index) => index >= 8)
    .join('\n');

  text = text
    /* (1) */ .replace(/#### /g, '')
    /* (2) */ .replace(/### ([^\n]+)/g, '\x1b[4m\x1b[31m$1\x1b[0m')
    .replace(/(Description:|Available parameters:)/g, '\x1b[2m\x1b[4m$1\x1b[0m')
    .replace(/`([^`]+)`/g, '\x1b[32m$1\x1b[0m');

  console.log(text);
});
