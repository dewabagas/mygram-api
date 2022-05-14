const Comment = require('../models/index').Comment;
const User = require('../models/index').User;

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
            result: comment
        })
    }).catch(error => {
        res.status(503).send({
            status: 'FAILED',
            message: 'Comment creation failed'
        })
    })
}

exports.getComment = async (req, res, next) => {
    User.findOne({
        where: { id: req.id },
        include: {
            model: Comment,
            as: 'comments'
        }
    }).then(result => {
        res.status(201).send({
            status: "SUCCESS",
            data: result
        })
    }).catch(error => {
        res.status(503).send({
            status: "FAILED",
            message: "failed load comment"
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
                message: 'Comment deleted',
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