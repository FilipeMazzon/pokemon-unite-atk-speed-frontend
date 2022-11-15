import {
  PAGINATION_PAGE,
  PAGINATION_PAGE_SIZE_DEFAULT,
} from '../config/pagination.config';

class PaginationDto {
  pageSize: number;

  page: number;

  constructor({
    page = PAGINATION_PAGE,
    pageSize = PAGINATION_PAGE_SIZE_DEFAULT,
  } = {}) {
    this.page = page;
    this.pageSize = pageSize;
  }
}

export default PaginationDto;
