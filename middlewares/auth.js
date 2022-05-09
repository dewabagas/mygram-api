var jwt = require('jsonwebtoken');
let privateKey = 'helloworld';

const verify = async (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, privateKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                err: 'Token is Not Valid'
            })
        }
        req.id = decoded.id;

        next();
    });
}

const generateToken = (payload) => {
    return jwt.sign(payload, privateKey, {
        algorithm: 'HS256',
        expiresIn: "1h"
    });
}

module.exports = {
    generateToken,
    verify
};

