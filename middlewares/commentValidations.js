const Joi = require('joi')

exports.validateComment = async (req, res, next) => {
    const schema = Joi.object().keys({
        comment: Joi.string().required(),
        photoid: Joi.number().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
}

exports.validateComment_update = async (req, res, next) => {
    const schema = Joi.object().keys({
        comment: Joi.string().required(),
    });
    if (schema.validate(req.body).error) {
        res.json({ error: schema.validate(req.body).error.message });
    }
    else {
        next();
    }
}

exports.params_commentid = async (req, res, next) => {
    const schema = Joi.object().keys({
        commentid: Joi.number().required(),
    });
    if (schema.validate(req.params).error) {
        res.json({ error: schema.validate(req.params).error.message });
    }
    else {
        next();
    }
}