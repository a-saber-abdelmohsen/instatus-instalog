import { Event } from "@prisma/client";
import { EncodeId, ObjectType } from "../helpers/hashids";

interface EventResponse {
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


export function transformEventsToResponse(originalObjects: any[]): EventResponse[] {
    return originalObjects.map(obj => ({
        ...obj,
        id: "evt_" + EncodeId(obj.id, ObjectType.Event),
        actionId: "evt_action_" + EncodeId(obj.action.id, ObjectType.Action),
        metadata: JSON.parse(obj.metadata),
        action: {
            ...obj.action,
            id: "evt_action_" + EncodeId(obj.action.id, ObjectType.Action)
        }
    }));
}