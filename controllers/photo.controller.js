const Photo = require('../models/index').Photo;
const User = require('../models/index').User;

exports.addPhoto = async (req, res, next) => {
    const { poster_image_url, title, caption } = req.body;

    Photo.create({
        poster_image_url: poster_image_url,
        title: title,
        caption: caption,
        userid: req.id
    }).then(photo => {
        res.status(201).send({
            status: 'SUCCESS',
            message: 'Photo Added',
            result: photo
        })
    }).catch(error => {
        res.status(503).send({
            status: 'FAILED',
            message: 'Photo creation failed'
        })
    })
}

exports.getPhoto = async (req, res, next) => {
    User.findOne({
        where: { id: req.id },
        include: {
            model: Photo,
            as: 'photos'
        }
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load photo"
        })
    })
}

exports.editPhoto = async (req, res, next) => {
    const { poster_image_url, title, caption } = req.body;

    Photo.findOne({
        where: {
            id: req.params.photoid
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        Photo.update({
            poster_image_url: poster_image_url,
            title: title,
            caption: caption,
        }, {
            where: {
                id: req.params.photoid
            }
        }).then(photo => {
            console.log('photo', photo)
            res.status(201).send({
                status: "SUCCESS",
                message: "Photo updated",
                result: result
            })
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update photo"
        })
    })
}

exports.deletePhoto = async (req, res, next) => {
    Photo.findOne({
        where: {
            id: req.params.photoid
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        Photo.destroy({
            where: {
                id: req.params.photoid
            }
        }).then(photo => {
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Photo deleted',
                result: photo
            })
        }).catch(error => {
            res.status(503).send({
                status: 'FAILED',
                message: 'Photo deletion failed'
            })
        })
    })
}