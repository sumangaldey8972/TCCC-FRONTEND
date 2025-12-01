export interface ColumnDefinition<T> {
    key: keyof T | string;
    header: string;
    cell?: (item: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
}

export interface TableProps<T> {
    data: T[];
    columns: ColumnDefinition<T>[];
    loading?: boolean;
    onRowClick?: (item: T) => void;
    emptyMessage?: string;
}

export interface PaginationInfo {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
    page: number;
    totalPages: number;
    totalDocs: number;
    limit: number;
}

export interface FilterState {
    status: string[];
    transactionType?: string[];
    dateRange: {
        start: string;
        end: string;
    };
    searchTerm: string;
}