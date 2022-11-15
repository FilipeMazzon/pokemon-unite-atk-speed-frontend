import PaginationDto from './pagination.dto';

class PaginationResponseDto extends PaginationDto {
  count: number;

  constructor({
    page, count = 0, pageSize,
  }: { page?: number, count?: number, pageSize?: number } = {}) {
    super({ page, pageSize });
    this.count = count;
  }
}

export default PaginationResponseDto;
