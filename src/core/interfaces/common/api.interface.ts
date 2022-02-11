export interface IPagination {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}

export interface HttpResponse {
    data: unknown[],
    pagination: IPagination;
    extras?: { [key: string]: any }
}

export interface HttpGetParams {
    limit: number;
    page: number;
}
