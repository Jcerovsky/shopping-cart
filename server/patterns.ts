/*
 * Copyright 2023 Marek Kobida
 */

const patterns = {
  // /list/{listId}/item
  LIST_ITEMS: /^\/list\/([0-9]+)\/item$/,
  // /list/{listId}
  SPECIFIC_LIST: /^\/list\/([0-9]+)$/,
  // /list/{listId}/item/{itemId}
  SPECIFIC_LIST_ITEM: /^\/list\/([0-9]+)\/item\/([0-9]+)$/,
} as const;

export default patterns;
