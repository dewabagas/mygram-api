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