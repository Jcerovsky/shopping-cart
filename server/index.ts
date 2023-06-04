/*
 * Copyright 2023 Marek Kobida
 */

import getIPv4Addresses from '@warden-sk/compiler/helpers/getIPv4Addresses';
import http from 'http';
import { lists } from './storage';

const server = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const url = new URL(request.url!, `https://${request.headers.host}`);

  if (request.method === 'GET') {
    if (url.pathname === '/list') {
      return response.end(JSON.stringify(lists));
    }
  }

  return response.end(JSON.stringify({ error: 'The request is not valid.' }));
});

server.listen(1337, () => {
  const filteredAddresses = getIPv4Addresses().filter(address => address !== '127.0.0.1');

  const address = filteredAddresses[0];

  console.log(`

[GET] /list \u2014 http://${address}:1337/list

`);
});
