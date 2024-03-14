import Hashids from "hashids"
import { func, number } from "joi"




export enum ObjectType {
    Action,
    Event
}

export function EncodeId(id: number, type: ObjectType): string {
    const hashids = new Hashids(type.toString(), 12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    return hashids.encode(id);
}


export function DecodeId(id: string, type: ObjectType): number | undefined {
    const hashids = new Hashids(type.toString(), 12, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
    id = type == ObjectType.Event ? id.replace("evt_", "") : id.replace("evt_action_", "")
    const decodedId = hashids.decode(id)[0];
    const validId = Number(decodedId);
    return Number.isNaN(validId) ? undefined : validId;
}