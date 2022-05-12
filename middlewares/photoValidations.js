const Joi = require('joi')

exports.validatePhoto = async (req, res, next) => {
    const schema = Joi.object().keys({
        poster_image_url: Joi.string().uri().required(),
        title: Joi.string().required(),
        caption: Joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
}