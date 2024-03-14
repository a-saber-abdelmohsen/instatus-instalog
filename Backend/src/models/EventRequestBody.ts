import Joi from "joi";
import { Action, Event } from "@prisma/client";

export interface EventRequestBody {
    id: string;
    object: string;
    actor_id: string;
    actor_name: string;
    group: string;
    action: {
        id: string;
        object: string;
        name: string;
    };
    target_id: string;
    target_name: string;
    location: string;
    metadata: {
        redirect: string;
        description: string;
        x_request_id: string;
    };
}


export function validateEventRequestBody(body: any): Joi.ValidationResult {
    const schema = Joi.object({
        id: Joi.string().required(),
        object: Joi.string().required(),
        actor_id: Joi.string().required(),
        actor_name: Joi.string().required(),
        group: Joi.string().required(),
        action: Joi.object({
            id: Joi.string().required(),
            object: Joi.string().required(),
            name: Joi.string().required(),
        }).required(),
        target_id: Joi.string().required(),
        target_name: Joi.string().required(),
        location: Joi.string().required(),
        metadata: Joi.object({
            redirect: Joi.string().required(),
            description: Joi.string().required(),
            x_request_id: Joi.string().required(),
        }).required(),
    });
    return schema.validate(body);
}


export function mapToEvent(reqBody: EventRequestBody): Event {
    const newEvent: Event = {
        object: reqBody.object,
        actor_id: reqBody.actor_id,
        actor_name: reqBody.actor_name,
        group: reqBody.group,
        target_id: reqBody.target_id,
        target_name: reqBody.target_name,
        location: reqBody.location,
        metadata: JSON.stringify(reqBody.metadata),
        actionId: 0,
        id: 6,
        occurred_at: new Date()
    };

    return newEvent;
}