const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token.startsWith("Bearer")) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decode) => {
            if (error) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decode = decode;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    authenticateToken,
};
