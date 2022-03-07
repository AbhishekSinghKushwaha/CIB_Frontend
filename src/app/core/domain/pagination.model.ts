export class PaginationModel {
  pageSize: number;
  pageSizeOptions: number[];
  total: number;
  pages: number[];
  currentPage = 1;

  constructor(pageSize: number, pageSizeOptions: number[], total: number) {
    this.pageSize = pageSize;
    this.pageSizeOptions = pageSizeOptions;
    this.total = total;
    this.pages = Array(Math.ceil(total / pageSize)).fill(0);
  }

  get description(): string {
    const lowerrange = (this.pageSize * this.currentPage) - this.pageSize + 1;
    const upperRange = this.total < this.pageSize * this.currentPage ? this.total : this.pageSize * this.currentPage;
    return `Showing ${lowerrange} -  ${upperRange} of ${this.total} item${this.total && 's' || ''}`
  }

  setPageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pages = Array(Math.ceil(this.total / pageSize)).fill(0);
  }

  setCurrentPage(currentPage: number): void {
    this.currentPage = currentPage;
  }
}
