export interface IOption<T> {
  label: string;
  value: T;
}

export interface IMeta {
  code: number;
  message: string;
}

export interface IPaging {
  page: number;
  limit: number;
  total?: number;
}

export interface IMetaPagination {
  code: number;
  message: string;
  pagination: IPagination;
}

export interface IPagination {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
