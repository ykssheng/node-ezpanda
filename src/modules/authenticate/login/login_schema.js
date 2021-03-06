const {check} = require('express-validator');

const loginSchema = {
    login: [
        check('email')
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('Email is required')
            .bail(),
            // .isLength({min: 3})
            // .withMessage('Minimum 3 characters required!')
            // .bail(),
        check('password')
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('Password is required')
            .bail()
    ],
};

module.exports = {
    loginSchema,
};
