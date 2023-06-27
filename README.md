# shopping-cart

This is a collaborative project that involves a client-server architecture.

The [client](./client) directory is managed by [Jakub Cerovský](https://github.com/Jcerovsky) and the [server](./server) directory is managed by [Marek Kobida](https://github.com/marekkobida).

## Server API

### Lists

#### `[GET] /list`

Description: It returns all created lists.

#### `[POST] /list`

Description: It creates a new list and returns an `id`.

Available parameters:
- `name`: The name of the new list.

### Specific list

#### `[PATCH] /list/{listId}`

Description: It updates a specific list identified by `listId`.

Available parameters:
- `name`

#### `[DELETE] /list/{listId}`

Description: It deletes a specific list identified by `listId`.

### List items

#### `[GET] /list/{listId}/item`

Description: It returns all items in a specific list identified by `listId`.

#### `[POST] /list/{listId}/item`

Description: It adds a new item to a specific list identified by `listId`.

Available parameters:
- `text`: The text of the new item.

#### `[DELETE] /list/{listId}/item`

Description: It deletes all items from a specific list identified by `listId`.

### Specific list item

#### `[PATCH] /list/{listId}/item/{itemId}`

Available parameters:
- `isDone`
- `text`

Description: It updates a specific item identified by `itemId`.

#### `[DELETE] /list/{listId}/item/{itemId}`

Description: It deletes a specific item, identified by `itemId`, from a specific list identified by `listId`.
