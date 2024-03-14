import { Request, Response } from "express"
import { EventRequestBody, mapToEvent, validateEventRequestBody } from "../models/EventRequestBody";
import { addAction, getActionByName } from "../services/actions.services";
import { addEvent } from "../services/events.service";

export async function createEvent(req: Request<{}, {}, EventRequestBody>, res: Response) {
    const { error } = validateEventRequestBody(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const reqObject = req.body;

    const action = await getActionByName(reqObject.action.name)
    if(action === undefined){
        return res.status(400).send("Unsupported Action Type");
    }
    
    var event = mapToEvent(reqObject);
    event.actionId = action.id;

    const eventResult = await addEvent(event)
    if(eventResult === undefined){
        return res.status(500).send("Error encountered please try again later");
    }

    return res.status(200).json(eventResult);
}

