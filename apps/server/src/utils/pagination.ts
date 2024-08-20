import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export function getArrayPaginationBuildTotal<T>(
  selectedItems: T[],
  totalRecords: number,
  options: IPaginationOptions = { limit: 10, page: 1 },
): Pagination<T> {
  const { limit, page } = options;

  const pagination = {
    totalItems: Number(totalRecords),
    itemCount: Number(selectedItems.length),
    itemsPerPage: Number(limit),
    totalPages: Math.ceil(Number(totalRecords) / Number(limit)),
    currentPage: Number(page),
  };

  return new Pagination(selectedItems, pagination);
}

export function getOffset(paginationOptions: IPaginationOptions) {
  let offset = 0;
  if (paginationOptions.page && paginationOptions.limit) {
    if (Number(paginationOptions.page) > 0) {
      offset =
        (Number(paginationOptions.page) - 1) * Number(paginationOptions.limit);
    }
  }
  return offset;
}
