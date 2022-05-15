const Comment = require('../models/index').Comment;
const User = require('../models/index').User;
const Photo = require('../models/index').Photo;

exports.addComment = async (req, res, next) => {
    const { photoid, comment } = req.body;

    Comment.create({
        photoid: photoid,
        comment: comment,
        userid: req.id
    }).then(comment => {
        res.status(201).send({
            status: 'SUCCESS',
            message: 'Comment Added',
            comment: comment
        })
    }).catch(error => {
        res.status(503).send({
            status: 'FAILED',
            message: 'Comment creation failed'
        })
    })
}

exports.getComment = async (req, res, next) => {
    Comment.findAll({

        include: [{
            model: Photo,
            as: 'photo',
            attributes: ['id', 'title', 'caption', 'poster_image_url'],
        },
        {
            model: User,
            as: 'user',
            attributes: ['id', 'username', 'profile_image_url', 'phone_number'],
        }],
        where: { photoid: req.id },
    }).then(result => {
        res.status(200).send({
            status: 'SUCCESS',
            message: 'Comment retrieved',
            Comments: result
        })

    }).catch(error => {
        res.status(503).send({
            status: 'FAILED',
            message: 'Comment load failed'
        })
    })
}

exports.editComment = async (req, res, next) => {
    const { comment } = req.body;

    Comment.findOne({
        where: {
            id: req.params.commentid
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        Comment.update({
            comment: comment,
        }, {
            where: { id: req.params.commentid }
        }).then(comment => {
            console.log("comment", comment)
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Comment updated',
                result: result
            })
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: `Failed update comment`
        })
    })
}

exports.deleteComment = async (req, res, next) => {
    Comment.findOne({
        where: {
            id: req.params.commentid
        }
    }).then(result => {
        if (req.id != result.userid) {
            return res.status(403).send({
                err: 'Forbidden'
            })
        }

        Comment.destroy({
            where: {
                id: req.params.commentid
            }
        }).then(comment => {
            res.status(200).send({
                status: 'SUCCESS',
                message: 'Your Comment has been successfully deleted',
                result: comment
            })
        }).catch(error => {
            res.status(503).send({
                status: 'FAILED',
                message: 'Comment deletion failed'
            })
        })
    })
}