export interface LogEntryType {
    id: string;
    object: string;
    actor_id: string;
    actor_name: string;
    group: string;
    actionId: string;
    target_id: string;
    target_name: string;
    location: string;
    occurred_at: string;
    metadata: Record<string, any>;
    action: {
        id: string;
        object: string;
        name: string;
    };
}
