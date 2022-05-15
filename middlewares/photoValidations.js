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

exports.validatePhoto_update = async (req, res, next) => {
    const schema = Joi.object().keys({
        poster_image_url: Joi.string().uri(),
        title: Joi.string(),
        caption: Joi.string(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
}

exports.params_photoid = async (req, res, next) => {
    const schema = Joi.object().keys({
        photoid: Joi.number().required(),
    });
    if (schema.validate(req.params).error) {
        res.json({ error: schema.validate(req.params).error.message });
    }
    else {
        next();
    }
}