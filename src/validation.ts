import Joi from '@hapi/joi';

export default {
    newIncident(data) {
        const schema = Joi.object({
            title: Joi
                .string()
                .max(100)
                .default(''),
            content: Joi
                .string()
                .min(50)
                .max(2054)
                .required(),
            officer: Joi
                .number()
                .default(-1),
            location: Joi
                .string()
                .default('Unknown'),
            created_by: Joi
                .string()
                .default(null),
        });

        const { error } = schema.validate(data);
        return error.message;
    },
    newOfficer(data) {
        const schema = Joi.object({
            fullname: Joi
                .string()
                .max(50)
                .default('Unknown'),
            badge: Joi
                .string()
                .max(7)
                .default('Unknown'),
            created_by: Joi
                .string()
                .default(null),
            picture: Joi
                .string()
                .base64()
                .required()
        });

        const { error } = schema.validate(data);
        return error.message;
    }
};