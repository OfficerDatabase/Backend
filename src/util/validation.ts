import Joi from 'joi';

export default {
    newIncident(data) {
        const schema = Joi.object({
            title: Joi
                .string()
                .min(0)
                .max(100)
                .allow(''),
            content: Joi
                .string()
                .min(50)
                .max(2054)
                .required(),
            officer: Joi
                .number(),
            date: Joi
                .date()
                .less('now'),
            location: {
                state: Joi
                    .object()
                    .keys({
                        name: Joi.string(),
                        value: Joi.number(),
                    })
                    .allow('', null, undefined),
                city: Joi
                    .object()
                    .keys({
                        name: Joi.string(),
                        value: Joi.number(),
                    })
                    .allow('', null, undefined),
            },
            created_by: Joi
                .object({
                    name: Joi.string().allow(''),
                    age: Joi.string(),
                    sex: Joi.string(),
                    ethnicity: Joi.string(),
                    height: Joi.string(),
                    weight: Joi.string(),
                })
                .allow('')
        });

        const { error } = schema.validate(data);
        return error && error.message;
    },
    newOfficer(data) {
        const schema = Joi.object({
            fullname: Joi
                .string()
                .max(50)
                .default('Unknown')
                .allow(''),
            badge: Joi
                .string()
                .max(7)
                .default('Unknown')
                .allow(''),
            location: Joi
                .string()
                .default(null)
                .allow(''),
            created_by: Joi
                .string()
                .default(null)
                .allow(''),
        });

        const { error } = schema.validate(data);
        return error && error.message;
    }
};