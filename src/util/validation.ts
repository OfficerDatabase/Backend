import Joi from '@hapi/joi';

export default {
    newIncident(data) {
        const schema = Joi.object({
            title: Joi
                .string()
                .max(100),
            content: Joi
                .string()
                .min(50)
                .max(2054)
                .required(),
            officer: Joi
                .number(),
            location: {
                state: Joi.string(),
                city: Joi.string()
            },
            created_by: {
                name: Joi.string(),
                age: Joi.string(),
                sex: Joi.string(),
                ethnicity: Joi.string(),
                height: Joi.string(),
                weight: Joi.string(),
            }
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
            location: Joi
                .string()
                .default(null),
            created_by: Joi
                .string()
                .default(null)
        });

        const { error } = schema.validate(data);
        return error && error.message;
        'https://firebasestorage.googleapis.com/v0/b/officerdb-665a8.appspot.com/o/images%2Fofficers%2FArnaldo%20Treutel_500x500?alt=media';
        'https://firebasestorage.googleapis.com/v0/b/officerdb-665a8.appspot.com/o/images%2Fofficers%2FArnaldo%20Treutel_500x500.jpg?alt=media';
    }
};