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
    User.findOne({
        where: { id: req.id },
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

exports.editSocialMedia = async (req, res) => {
    const { name, social_media_url } = req.body;
    console.log('req id', req.id)

    SocialMedia.findOne({
        where: { id: req.params.socialMediaId }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        SocialMedia.update({
            name: name,
            social_media_url: social_media_url
        }, {
            where: { id: req.params.socialMediaId }
        }).then(socialMedia => {
            console.log('socialMedia', socialMedia)
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Social Media updated',
                social_media: socialMedia
            })
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: `Failed load social media`
        })
    })
}

exports.deleteSocialMedia = async (req, res) => {
    SocialMedia.findOne({
        where: { id: req.params.socialMediaId }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        SocialMedia.destroy({ where: { id: req.params.socialMediaId } }).then(socialmedia => {
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Your social media has been successfully deleted',
                result: socialmedia
            })
        })
    })
}