
const { celebrate, Segments, Joi } = require('celebrate')

class OngValidator {
    create() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email:  Joi.string().email().required(),
                whatsapp: Joi.string().min(10).max(11).required(),
                city: Joi.string().required(),
                uf: Joi.string().length(2).required()
            })
        })
    }
}

module.exports = new OngValidator()