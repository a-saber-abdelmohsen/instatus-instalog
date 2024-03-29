import Joi from "joi";

export function validateGetEventRequestQuery(query: any): Joi.ValidationResult {
    const schema = Joi.object({
        pageNumber: Joi.number().integer().min(1).default(1),
        pageSize: Joi.number().integer().min(10).default(10),
        searchKey: Joi.string().optional().trim().allow(""),
        actor_id: Joi.string().optional(),
        target_id: Joi.string().optional(),
        action_id: Joi.string().optional(),
        cursor_id: Joi.string().optional().trim().allow(""),
    });
    return schema.validate(query, { stripUnknown: true });
}
