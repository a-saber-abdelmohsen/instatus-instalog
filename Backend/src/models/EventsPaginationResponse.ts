import { EventResponse } from "./EventResponse";
import { PaginationResult } from "./PaginationResult";

export interface EventsPaginationResponse {
    events: EventResponse[],
    pagination: PaginationResult
}