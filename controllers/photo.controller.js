const Photo = require('../models/index').Photo;
const User = require('../models/index').User;
const Comment = require('../models/index').Comment;

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
    Photo.findAll({

        include: [{
            model: Comment,
            as: 'comments',
            attributes: ['comment'],
            include: {
                model: User,
                as: 'user',
                attributes: ['username']
            }
        },
        {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'profile_image_url'],
        },
        ],
        where: { id: req.id },
    }).then(result => {
        res.status(200).send({
            status: "SUCCESS",
            Photo: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load photo"
        })
    })


    // try {
    //     const userid = req.id;

    //     const Photos = await Photo.findAll({
    //         include: [
    //             {
    //                 model: Comment,
    //                 as: 'comments',
    //                 attributes: ['comment'],
    //                 include: [
    //                     {
    //                         model: User,
    //                         required: true,
    //                         as: 'user',
    //                         attributes: ['username']
    //                     }
    //                 ]
    //             },
    //             {
    //                 model: User,
    //                 as: 'user',
    //                 attributes: ['id', 'username', 'profile_image_url'],
    //             },
    //         ],
    //         where: { userid: userid },
    //         subQuery: false
    //     });

    //     return res.status(200).send({
    //         Photo: Photos
    //     });
    // }
    // catch (error) {
    //     return res.status(503).send({
    //         status: "FAILED",
    //         message: "failed load photo"
    //     });
    // }
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
                message: 'Your Photo has been successfully deleted',
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