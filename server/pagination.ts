/*
 * Copyright 2023 Marek Kobida
 */

interface T {
  // count: number;
  filtered: unknown[];
  // limit: number;
  // page: number;
  pageCount: number;
}

function pagination(of: unknown[], url: URL): T | undefined {
  const limit = url.searchParams.get('limit');
  const page = url.searchParams.get('page');

  const pattern = /[0-9]+/;

  if (limit && pattern.test(limit) && page && pattern.test(page)) {
    /* (1) */ const startIndex = (+page - 1) * +limit;
    /* (2) */ const endIndex = startIndex + +limit;

    /**/

    const filtered = of
      /**/ .filter((list, index) => {
        return index >= startIndex && index < endIndex;
      });

    const pageCount = Math.ceil(of.length / +limit);

    return {
      // count: of.length,
      filtered,
      // limit: +limit,
      // page: +page,
      pageCount,
    };
  }
}

export default pagination;
