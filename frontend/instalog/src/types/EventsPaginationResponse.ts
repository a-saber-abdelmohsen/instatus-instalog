import { LogEntryType } from "./LogEntryType";
import { PaginationResult } from "./PaginationResult";

export interface EventsPaginationResponse {
    events: LogEntryType[],
    pagination: PaginationResult
}