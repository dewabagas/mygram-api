const request = require('supertest');
const app = require('../../app');
const { sequelize, User, Photo } = require('../../models');
const auth = require('../../middlewares/auth');

let token = "";
let photo = {};
let comments = {};

beforeAll(async () => {
    const user = await User.findById(1);

    token = auth.generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
    });
});

describe('POST photos', () => {
    it('should return status code 201', (done) => {
        request(app)
            .post('/photos')
            .set('token', token)
            .send({
                poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
                title: 'Kita bermain',
                caption: 'Kita bermain bersama teman-teman',
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                photo = res.body.photo
                expect(res.status).toEqual(201);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty('photo');
                expect(typeof res.body.photo).toEqual('object');
                done();
            })
    });
    it('should return status code 503', (done) => {
        request(app)
            .post('/photos')
            .set('token', token)
            .send({
                poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
                title: 'Kita bermain',
                caption: 'Kita bermain bersama teman-teman',
            })
            .end((err, res) => {
                if (err) {
                    done(err)
                }

                console.log(res.body);
                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'FAILED');
                done();
            })
    });
});


describe('GET photos', () => {
    it('should return status code 200', (done) => {
        request(app)
            .get('/photos')
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'SUCCESS');
                done();
            });
    });

    it('should return status code 503', (done) => {
        request(app)
            .get('/photos')
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'FAILED');
                done();
            });
    });
});

describe('PUT photos', () => {
    it('should return status code 200', (done) => {
        request(app)
            .put('/photos/1')
            .set('token', token)
            .send({
                poster_image_url: 'https://i.imgur.com/Xq2ZRXS.jpg',
                title: 'Kita bermain',
                caption: 'Kita bermain bersama teman-teman',
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'SUCCESS');
                done();
            });
    });

});

describe('DELETE photos', () => {
    it('should return status code 200', (done) => {
        request(app)
            .delete('/photos/' + photo.id)
            .set('token', token)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(200);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'SUCCESS');
                done();
            });
    });

    it('should return status code 503', (done) => {
        request(app)
            .delete('/photos/' + photo.id)
            .end((err, res) => {
                if (err) {
                    done(err);
                }

                expect(res.status).toEqual(503);
                expect(typeof res.body).toEqual('object');
                expect(res.body).toHaveProperty("status", 'FAILED');
                done();
            });
    });
});

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('photos', {
        id: photo.id
    })
        .then(() => {
            return sequelize.queryInterface.bulkDelete('comments', {
                photo_id: photo.id
            });
        })
        .then(() => {
            done();
        })
        .catch((err) => {
            done(err);
        })
});