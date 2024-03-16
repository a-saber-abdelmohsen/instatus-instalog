export interface PaginationResult {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
}