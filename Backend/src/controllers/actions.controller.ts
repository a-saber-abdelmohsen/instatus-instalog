import { Request, Response } from "express";
import { AddActionRequestBody, validateAddActionRequestBody } from "../models/AddActionRequestBody";
import { addAction, getActionByName, getActions } from "../services/actions.services";
import { Action } from "@prisma/client";
import { EncodeId, ObjectType } from "../helpers/hashids";



export async function createAction(req: Request<{}, {}, AddActionRequestBody>, res: Response) {
    const { error } = validateAddActionRequestBody(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const reqObject = req.body;

    var action = await getActionByName(reqObject.name)
    if (action !== undefined) {
        return res.status(400).send("Action already exist");
    }

    action = {
        id: 0,
        object: reqObject.object,
        name: reqObject.name,
    };

    const actionResult = await addAction(action)
    if (actionResult === undefined) {
        return res.status(500).send("Error encountered please try again later");
    }

    return res.status(201)
        .json({
            id: "evt_action_" + EncodeId(actionResult.id, ObjectType.Action)
        });
}

export async function getAllActions(req: Request, res: Response){
    const actions = await getActions()
    if (actions === undefined){
        return res.status(500).send("Error encountered please try again later");
    }

    return res.status(201)
        .json(
            actions.map(obj => ({
                ...obj,           
                id: "evt_action_" + EncodeId(obj.id, ObjectType.Action),
            }))
        );
}