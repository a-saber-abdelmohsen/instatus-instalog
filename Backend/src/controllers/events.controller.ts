import { Request, Response } from "express"
import { AddEventRequestBody, mapToEvent, validateAddEventRequestBody } from "../models/ِِAddEventRequestBody";
import { getActionByName } from "../services/actions.services";
import { addEvent, getEventsPage } from "../services/events.service";
import { validateGetEventRequestQuery } from "../models/GetEventRequestBody";
import { transformEventsToResponse } from "../models/EventResponse";
import { DecodeId, EncodeId, ObjectType } from "../helpers/hashids";
import { EventsPaginationResponse } from "../models/EventsPaginationResponse";

export async function createEvent(req: Request<{}, {}, AddEventRequestBody>, res: Response) {
    const { error } = validateAddEventRequestBody(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const reqObject = req.body;

    const action = await getActionByName(reqObject.action.name)
    if (action === undefined) {
        return res.status(400).send("Unsupported Action Type");
    }

    var event = mapToEvent(reqObject);
    event.actionId = action.id;

    const eventResult = await addEvent(event)
    if (eventResult === undefined) {
        return res.status(500).send("Error encountered please try again later");
    }

    return res.status(201).json({ id: "evt_" + EncodeId(eventResult.id, ObjectType.Event) });
}

export async function getEvents(req: Request, res: Response) {
    const { error, value } = validateGetEventRequestQuery(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    var actionId: number | undefined;
    var cursor_id: number | undefined;
    if (value.action_id){
        try{
            actionId = DecodeId(value.action_id, ObjectType.Action);
            if (!actionId){
                return res.status(400).json({ error: "Invalid action_id" });
            }
        }catch(error){
            return res.status(400).json({ error: "Invalid action_id" });
        }
    }

    if (value.cursor_id && value.cursor_id != ""){
        try {
            cursor_id = DecodeId(value.cursor_id, ObjectType.Event);
            if (!cursor_id){
                return res.status(400).json({ error: "Invalid cursor_id" });
            }
        } catch (error) {
            return res.status(400).json({ error: "Invalid cursor_id" });
        }
    }
    
    
    const eventsResult = await getEventsPage(
        value.pageNumber,
        value.pageSize,
        value.searchKey,
        value.actor_id,
        value.target_id,
        actionId, 
        cursor_id
    )
    if (eventsResult === undefined) {
        return res.status(500).send("Error encountered please try again later");
    }

    const result: EventsPaginationResponse = {
        events: transformEventsToResponse(eventsResult.events),
        pagination: eventsResult.pagination
    }
    return res.status(200).json(result);
}