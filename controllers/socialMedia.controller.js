const SocialMedia = require("../models/index").SocialMedia;
const User = require("../models/index").User;

exports.addSocialMedia = async (req, res) => {
    const { name, social_media_url } = req.body;
    console.log('req id', req.id);

    SocialMedia.create({
        name: name,
        social_media_url: social_media_url,
        userid: req.id
    }).then(result => {
        res.status(201).send({
            status: 'SUCCESS',
            message: 'Social Media added',
            result: result,
        })
    }).catch(error => {
        res.status(503).send({
            status: 'FAILED',
            message: 'social media creation failed'
        })
    })
}

exports.getSocialMedia = async (req, res) => {
    User.findOne({where: {id: req.id}, 
        include: {
            model: SocialMedia,
            as: 'socialmedias'
        }
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load social media"
        })
    })
}