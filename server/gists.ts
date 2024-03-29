/*
 * Copyright 2023 Marek Kobida
 */

import { GIST_ID, GITHUB_TOKEN } from '../server.json';
import type { Item } from './items';
import type { List } from './lists';

async function get(): Promise<{ items: Item[]; lists: List[] }> {
  const response = await fetch(
    /**/ `https://api.github.com/gists/${GIST_ID}`,
    /**/ {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    }
  );

  const json = await response.json();

  const { 'items.json': items, 'lists.json': lists } = json.files;

  return {
    items: JSON.parse(items.content),
    lists: JSON.parse(lists.content),
  };
}

function set(fileName: 'items', content: Item[]): Promise<{ items: Item[]; lists: List[] }>;
function set(fileName: 'lists', content: List[]): Promise<{ items: Item[]; lists: List[] }>;
async function set(fileName: 'items' | 'lists', content: Item[] | List[]): Promise<{ items: Item[]; lists: List[] }> {
  const response = await fetch(
    /**/ `https://api.github.com/gists/${GIST_ID}`,
    /**/ {
      body: JSON.stringify({
        files: {
          [`${fileName}.json`]: {
            content: JSON.stringify(content),
          },
        },
      }),
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GITHUB_TOKEN}`,
      },
      method: 'PATCH',
    }
  );

  const json = await response.json();

  const { 'items.json': items, 'lists.json': lists } = json.files;

  return {
    items: JSON.parse(items.content),
    lists: JSON.parse(lists.content),
  };
}

export { get, set };
