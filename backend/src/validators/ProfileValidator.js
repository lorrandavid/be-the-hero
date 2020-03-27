
const { celebrate, Segments, Joi } = require('celebrate')

class ProfileValidator {
    index() {
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown()
        })
    }
}

module.exports = new ProfileValidator()