import { IPagination } from "../../core/interfaces/common/api.interface";

export class Pagination implements IPagination {

    constructor(
        public readonly page: number = 1,
        public readonly limit: number = 10,
        public readonly totalCount: number)
    { }

    get totalPages() {
        return Math.floor(this.totalCount / this.limit);
    }

}
