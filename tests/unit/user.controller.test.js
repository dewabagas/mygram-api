const User = require('../../models/index').User;
const UserController = require('../../controllers/user.controller')
const bcrypt = require('bcrypt');
const httpMocks = require('node-mocks-http')

jest.mock('../../models/');

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = jest.fn()
})

describe('UserController.register', () => {
    it('should return status code 201', async () => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync('password', salt)

        const user = {
            full_name: 'Edward Kenway',
            email: 'edward@gmail.com',
            username: 'kenway',
            password: hash,
            profile_image_url: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
            age: 21,
            phone_number: 620345,
        };
        const userModel = {
            create: jest.fn(() => Promise.resolve(user)),
            findOne: jest.fn(() => Promise.resolve({email: 'edward@gmail.com'}))
        };
        User.findOne = userModel.findOne
        User.create = userModel.create
        await UserController.register(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync('password', salt)

        const user = {
            full_name: 'Edward Kenway',
            email: 'edward@gmail.com',
            username: 'kenway',
            password: hash,
            profile_image_url: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
            age: 21,
            phone_number: 620345,
        };
        const userModel = {
            create: jest.fn(() => Promise.reject(user)),
            findOne: jest.fn(() => Promise.resolve({email: 'edward@gmail.com'}))
        };
        User.findOne = userModel.findOne
        User.create = userModel.create
        await UserController.register(req, res, next);
        expect(res.statusCode) == (503)
    })
})

// describe('UserController.login', () => {
//     it('should return status code 201', async () => {
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync('password', salt)
//         const hashCompare = bcrypt.hashSync('password', salt)

//         const user = {
//             email: 'edward@gmail.com',
//             password: hash,
//         };

//         const passwordCompare = {
//             password: hash,
//             passwordCompare: hash,
//         };

//         const userModel = {
//             findOne: jest.fn(() => Promise.resolve(user)),
//             isValid: jest.fn(() => Promise.resolve(passwordCompare))
//         };
//         User.findOne = userModel.findOne
//         // User.isValid = userModel.isValid
//         await UserController.login(req, res, next);
//         expect(res.statusCode) == (201)
//     })

//     it('should return status code 400', async () => {
//         const salt = bcrypt.genSaltSync(10)
//         const hash = bcrypt.hashSync('password', salt)

//         const user = {
//             email: 'edward@gmail.com',
//             password: hash,
//         };
//         const userModel = {
//             findOne: jest.fn(() => Promise.reject(user)),
//         };
//         User.findOne = userModel.findOne
//         await UserController.login(req, res, next);
//         expect(res.statusCode) == (503)
//     })
// })

describe('UserController.editUser', () => {
    it('should return status code 201', async () => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync('password', salt)

        const user = {
            full_name: 'Edward Kenway',
            email: 'edward@gmail.com',
            username: 'kenway',
            password: hash,
            profile_image_url: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
            age: 21,
            phone_number: 620345,
        };
        const userModel = {
            findOne: jest.fn(() => Promise.resolve(user)),
            update: jest.fn(() => Promise.resolve(user))
        };
        User.findOne = userModel.findOne
        User.update = userModel.update
        await UserController.editUser(req, res, next);
        expect(res.statusCode) == (201)
    })

    it('should return status code 503', async () => {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync('password', salt)

        const user = {
            full_name: 'Edward Kenway',
            email: 'edward@gmail.com',
            username: 'kenway',
            password: hash,
            profile_image_url: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
            age: 21,
            phone_number: 620345,
        };
        const userModel = {
            findOne: jest.fn(() => Promise.reject(user)),
            update: jest.fn(() => Promise.reject(user))
        };
        User.findOne = userModel.findOne
        User.update = userModel.update
        await UserController.editUser(req, res, next);
        expect(res.statusCode) == (503)
    })
})

describe('UserController.deleteUser', () => {
    it('should return status code 201', async () => {
        const user = {
            id: 1,
        };
        const userModel = {
            findOne: jest.fn(() => Promise.resolve(user)),
            destroy: jest.fn(() => Promise.resolve(user))
        };
        User.findOne = userModel.findOne
        User.destroy = userModel.destroy
        await UserController.deleteUser(req, res, next);
        expect(res.statusCode) == (201)
    })
})