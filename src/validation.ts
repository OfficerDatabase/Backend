import Joi from '@hapi/joi'

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
        })

        const { error } = schema.validate(data)
        return error.message
    }
}