const { Photo } = require('../../models/index');
const User = require('../../models/index').User;
const PhotoController = require('../../controllers/Photo.controller')

const httpMocks = require('node-mocks-http')

jest.mock('../../models/');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
})

describe('PhotoController.addPhoto', () => {
    it('should return status code 201', async () => {
        const photo = {
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            create: jest.fn(() => Promise.resolve(photo))
        };
        Photo.create = photoModel.create
        await PhotoController.addPhoto(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const photo = {
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            create: jest.fn(() => Promise.reject(photo))
        };
        Photo.create = photoModel.create
        await PhotoController.addPhoto(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('PhotoController.getPhoto', () => {
    it('should return status code 200', async () => {
        const photo = {
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            findAll: jest.fn(() => Promise.resolve(photo))
        };
        Photo.findAll = photoModel.findAll
        await PhotoController.getPhoto(req, res, next);
        expect(res.statusCode) == (200)
    });
    it('should return status code 503', async () => {
        const photo = {
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            findAll: jest.fn(() => Promise.reject(photo))
        };
        Photo.findAll = photoModel.findAll
        await PhotoController.getPhoto(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('PhotoController.editPhoto', () => {
    it('should return status code 201', async () => {
        const photo = {
            id: 1,
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            findOne: jest.fn(() => Promise.resolve(photo)),
            update: jest.fn(() => Promise.resolve(photo))
        };
        Photo.findOne = photoModel.findOne
        Photo.update = photoModel.update
        await PhotoController.editPhoto(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const photo = {
            id: 1,
            poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
            title: 'Kita bermain',
            caption: 'Kita bermain bersama teman-teman',
            userid: 1
        };
        const photoModel = {
            findOne: jest.fn(() => Promise.reject(photo)),
            update: jest.fn(() => Promise.reject(photo))
        };
        Photo.findOne = photoModel.findOne
        Photo.update = photoModel.update
        await PhotoController.editPhoto(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('PhotoController.deletePhoto', () => {
    it('should return status code 201', async () => {
        const photo = {
            id: 1,
        };
        const photoModel = {
            findOne: jest.fn(() => Promise.resolve(photo)),
            destroy: jest.fn(() => Promise.resolve(photo))
        };
        Photo.findOne = photoModel.findOne
        Photo.destroy = photoModel.destroy
        await PhotoController.deletePhoto(req, res, next);
        expect(res.statusCode) == (201)
    })
})