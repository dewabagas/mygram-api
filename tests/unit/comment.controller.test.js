const Comment = require('../../models/index').Comment;
const User = require('../../models/index').User;
const CommentController = require('../../controllers/comment.controller')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('CommentController.addComment', () => {
    it('should return status code 201', async () => {
        const comment = {
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            create: jest.fn(() => Promise.resolve(comment))
        };
        Comment.create = commentModel.create
        await CommentController.addComment(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const comment = {
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            create: jest.fn(() => Promise.reject(comment))
        };
        Comment.create = commentModel.create
        await CommentController.addComment(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('CommentController.getComment', () => {
    it('should return status code 200', async () => {
        const comment = {
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            findAll: jest.fn(() => Promise.resolve(comment))
        };
        Comment.findAll = commentModel.findAll
        await CommentController.getComment(req, res, next);
        expect(res.statusCode) == (200)
    })

    it('should return status code 503', async () => {
        const comment = {
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            findAll: jest.fn(() => Promise.reject(comment))
        };
        Comment.findAll = commentModel.findAll
        await CommentController.getComment(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('CommentController.editComment', () => {
    it('should return status code 201', async () => {
        const comment = {
            id: 1,
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            findOne: jest.fn(() => Promise.resolve(comment)),
            update: jest.fn(() => Promise.resolve(comment))
        };
        Comment.findOne = commentModel.findOne
        Comment.update = commentModel.update
        await CommentController.editComment(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const comment = {
            id: 1,
            photoid: 1,
            comment: 'ayo kita bermain',
            userid: 1
        };
        const commentModel = {
            findOne: jest.fn(() => Promise.reject(comment)),
            update: jest.fn(() => Promise.reject(comment))
        };
        Comment.findOne = commentModel.findOne
        Comment.update = commentModel.update
        await CommentController.editComment(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('CommentController.deleteComment', () => {
    it('should return status code 201', async () => {
        const comment = {
            id: 1,
        };
        const commentModel = {
            findOne: jest.fn(() => Promise.resolve(comment)),
            destroy: jest.fn(() => Promise.resolve(comment))
        };
        Comment.findOne = commentModel.findOne
        Comment.destroy = commentModel.destroy
        await CommentController.deleteComment(req, res, next);
        expect(res.statusCode) == (201)
    })
})