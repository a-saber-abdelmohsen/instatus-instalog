import Joi from "joi";

export interface AddActionRequestBody {
    object: string;
    name: string;
}

export function validateAddActionRequestBody(body: any): Joi.ValidationResult {
    const schema = Joi.object({
        object: Joi.string().required(),
        name: Joi.string().required(),
    });
    return schema.validate(body, { stripUnknown: true });
}