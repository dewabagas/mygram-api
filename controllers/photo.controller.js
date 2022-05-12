const Photo = require('../models/index').Photo;
const User = require('../models/index').User;

exports.addPhoto = async (req, res) => {
    const { poster_image_url, title, caption } = req.body;
    console.log('req id', req.id)

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

exports.getPhoto = async (req, res) => {
    Photo.findAll({
        where: { userid: req.id }, include: [
            {
                model: User,
                as: 'user',
            }
        ]
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            photos: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load products"
        })
    })
}

exports.editPhoto = async (req, res) => {
    const { poster_image_url, title, caption } = req.body;
    console.log('req id', req.id)

    Photo.findOne({
        where: {
            id: req.params.photoid
        }
    }).then(result => {
        if (result) {
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
        } else {
            res.status(404).send({
                status: "FAILED",
                message: "Photo not found"
            })
        }
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed update photo"
        })
    })
}

exports.deletePhoto = async (req, res) => {
    Photo.findOne({
        where: {
            id: req.params.photoid
        }
    }).then(result => {
        if (result) {
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
            })
        } else {
            res.status(404).send({
                status: 'FAILED',
                message: 'Photo not found'
            })
        }

    }).catch(error => {
        console.log("error", error)
        res.status(503).send({
            status: 'FAILED',
            message: 'Photo deletion failed'
        })
    })
}