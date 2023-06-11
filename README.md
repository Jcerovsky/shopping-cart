# shopping-cart

This is a collaborative project that involves a client-server architecture.

The [client](./client) directory is managed by [Jakub Cerovský](https://github.com/Jcerovsky) and the [server](./server) directory is managed by [Marek Kobida](https://github.com/marekkobida).

## Server API

### Lists

- `[GET] /list`
    - It returns all created lists.

- `[POST] /list?name=Test`
    - It creates a new list and returns an `id`.

### Specific list

- `[PATCH] /list/{listId}?name=Test`
    - It updates a specific list identified by `listId`.

- `[DELETE] /list/{listId}`
    - It deletes a specific list identified by `listId`.

### List items

- `[GET] /list/{listId}/item`
    - It returns all items in a specific list identified by `listId`.

- `[POST] /list/{listId}/item?text=Test`
    - It adds a new item to a specific list identified by `listId`.

- `[DELETE] /list/{listId}/item`
    - It deletes all items from a specific list identified by `listId`.

### Specific list item

- `[PATCH] /list/{listId}/item/{itemId}`
    - It updates a specific item identified by `itemId`.

- `[DELETE] /list/{listId}/item/{itemId}`
    - It deletes a specific item, identified by `itemId`, from a specific list identified by `listId`.
