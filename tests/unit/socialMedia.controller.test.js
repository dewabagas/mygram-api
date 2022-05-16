const SocialMedia = require('../../models/index').SocialMedia;
const User = require('../../models/index').User;
const SocialMediaController = require('../../controllers/socialMedia.controller')
const httpMocks = require('node-mocks-http')

jest.mock('../../models/');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('SocialMediaController.addSocialMedia', () => {
    it('should return status code 201', async () => {

        const socialMedia = {
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        }
        const socialMediaModel = {
            create: jest.fn(() => Promise.resolve(socialMedia))
        };
        SocialMedia.create = socialMediaModel.create
        await SocialMediaController.addSocialMedia(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const socialMedia = {
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        }
        const socialMediaModel = {
            create: jest.fn(() => Promise.reject(socialMedia))
        };
        SocialMedia.create = socialMediaModel.create
        await SocialMediaController.addSocialMedia(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('SocialMediaController.getSocialMedia', () => {
    it('should return status code 200', async () => {
        const socialMedia = {
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        }
        const socialMediaModel = {
            findOne: jest.fn(() => Promise.resolve(socialMedia)),
            findAll: jest.fn(() => Promise.resolve(socialMedia))
        };
        User.findOne = socialMediaModel.findOne
        SocialMedia.findAll = socialMediaModel.findAll
        await SocialMediaController.getSocialMedia(req, res, next);
        expect(res.statusCode) == (200)
    })

    it('should return status code 503', async () => {
        const socialMedia = {
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        }
        const socialMediaModel = {
            findOne: jest.fn(() => Promise.resolve(socialMedia)),
            findAll: jest.fn(() => Promise.reject(socialMedia))
        };
        User.findOne = socialMediaModel.findOne

        SocialMedia.findAll = socialMediaModel.findAll
        await SocialMediaController.getSocialMedia(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('SocialMediaController.editSocialMedia', () => {
    it('should return status code 201', async () => {
        const socialMedia = {
            id: 1,
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        };
        const socialMediaModel = {
            findOne: jest.fn(() => Promise.resolve(socialMedia)),
            update: jest.fn(() => Promise.resolve(socialMedia))
        };
        SocialMedia.findOne = socialMediaModel.findOne
        SocialMedia.update = socialMediaModel.update
        await SocialMediaController.editSocialMedia(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const socialMedia = {
            id: 1,
            name: "instagram",
            social_media_url: "https://www.instagram.com/naruto/",
            userid: 1
        };
        const socialMediaModel = {
            findOne: jest.fn(() => Promise.reject(socialMedia)),
            update: jest.fn(() => Promise.reject(socialMedia))
        };
        SocialMedia.findOne = socialMediaModel.findOne
        SocialMedia.update = socialMediaModel.update
        await SocialMediaController.editSocialMedia(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('SocialMediaController.deleteSocialMedia', () => {
    it('should return status code 201', async () => {
        const socialMedia = {
            id: 1,
        };
        const socialMediaModel = {
            findOne: jest.fn(() => Promise.resolve(socialMedia)),
            destroy: jest.fn(() => Promise.resolve(socialMedia))
        };
        SocialMedia.findOne = socialMediaModel.findOne
        SocialMedia.destroy = socialMediaModel.destroy
        await SocialMediaController.deleteSocialMedia(req, res, next);
        expect(res.statusCode) == (201)
    })
})