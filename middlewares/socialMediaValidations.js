
const Joi = require('joi')

exports.validateSocialMedia = async (req, res, next) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        social_media_url: Joi.string().uri().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    } else {
        next();
    }
};