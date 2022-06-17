const request = require('supertest');
const app = require('../../app');
const { sequelize, User, Photo } = require('../../models');
const auth = require('../../middlewares/auth');

let token = "";
let photo = {};
let comments = {};

beforeAll(async () => {
    const user = await User.findById(1);
    photo = await Photo.create({
        title: 'Kita bermain',
        caption: 'Kita bermain bersama teman-teman',
        poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
        Userid: 1
    });

    token = auth.generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
    });
});

describe('POST comments', () => {
    it('Should send response with code 200', (done) => {
        request(app)
            .post('/comments/')
            .set('token', token)
            .send({
                comment: "bermain kemana",
                photoId: photo.id
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                comments = res.body.comment
                expect(res.status).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('comment');
                expect(typeof res.body.comment).toEqual('object');
                expect(res.body.comment).toHaveProperty('comment');
                done();
            })
    });

    it('Should send response with code 503', (done) => {
        request(app)
            .post('/comments/')
            .set('token', token)
            .send({
                photoId: photo.id
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'FAILED');
                expect(res.body).toHaveProperty("message", 'Comment cannot be empty');
                expect(res.body).toHaveProperty("error");
                done();
            })
    });
});

describe('GET comments', () => {
    it('Should send response with code 200', (done) => {
        request(app)
            .get('/comments/')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('comments');
                expect(typeof res.body.comment).toEqual('object');
                expect(res.body.comment).toHaveProperty('comment');
                done();
            })
    });

    it('Should send response with code 503', (done) => {
        request(app)
            .get('/comments/')
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'FAILED');
                done();
            });
    });
});

describe('PUT comments', () => {
    it('Should send response with code 200', (done) => {
        request(app)
            .put('/comments/' + comments.id)
            .set('token', token)
            .send({
                comment: "bermain kemana",
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('comment');
                expect(typeof res.body.comment).toEqual('object');
                expect(res.body.comments.comment).toEqual('updated comment');
                done();
            })
    });

    it('Should send response with code 503', (done) => {
        request(app)
            .put('/comments/322')
            .set('token', token)
            .send({
                comment: "bermain kemana",
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("message");
                done();
            })
    });

    it('Should send response with code 404', (done) => {
        request(app)
            .put('/comments/' + comments.id)
            .set('token', token)
            .send({
                comment: "bermain kemana",
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(404);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("message");
                done();
            })
    });
});

describe('DELETE comments', () => {
    it('Should send response with code 200', (done) => {
        request(app)
            .delete('/comments/' + comments.id)
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('message');
                expect(res.body.message).toEqual('Comment deleted');
                done();
            })
    });

    it('Should send response with code 503', (done) => {
        request(app)
            .delete('/comments/322')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("message");
                done();
            })
    });
});

afterAll(async () => {
    await sequelize.close();
});