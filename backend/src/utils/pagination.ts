export interface PaginationMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
}

export function buildPaginationMeta(
  totalItems: number,
  currentPage: number,
  limit: number,
): PaginationMeta {
  return {
    total_items: totalItems,
    total_pages: Math.ceil(totalItems / limit) || 0,
    current_page: currentPage,
    limit,
  };
}

export function buildSkipTake(page: number, limit: number) {
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
}