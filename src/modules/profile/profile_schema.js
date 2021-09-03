const joi = require("@hapi/joi");

const profileSchema = {
    updateUserEmail: {
        body: {
            email: joi
                .string()
                .max(255)
                .required()
                .label("Email"),
            id: joi
                .number()
                .max(11)
                .required()
                .label("User Id")
        },
    },
    updateUserPassword: {
        body: {
            password: joi
                .string()
                .max(100)
                .required()
                .label("Password"),
            id: joi
                .number()
                .max(11)
                .required()
                .label("User Id")
        },
    },
};

module.exports = {
    profileSchema,
};