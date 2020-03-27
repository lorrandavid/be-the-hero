
const { celebrate, Segments, Joi } = require('celebrate')

class IncidentValidator {
    index() {
        return celebrate({
            [Segments.QUERY]: Joi.object().keys({
                page: Joi.number()
            })
        })
    }

    delete() {
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.string().required()
            })
        })
    }
}

module.exports = new IncidentValidator()