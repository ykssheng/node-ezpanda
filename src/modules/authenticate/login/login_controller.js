const { dbConnPool } = require("../../../../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const customResponse = require("../../../utils/custom_response");
const customError = require("../../../utils/custom_error");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.login = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        if (email && password) {
            const [user, userFields] = await dbConnPool.query(
                `SELECT email, password FROM users WHERE email=?`
                , [email]
            );

            if (user.length > 0) {
                const validPassword = validatePassword(user, password);

                if(user[0].is_verify === 0) {
                    throw new customError("Email has not been verify.");
                }

                if (validPassword) {
                    let token = jwt.sign({ email: email }, JWT_SECRET_KEY, {
                        expiresIn: "24h",
                    });
    
                    user[0].token = token;
                    customResponse.success(res, { user: user[0] });
                } else {
                    throw new customError("Incorrect email or password.");
                }
            }
            else {
                throw new customError("Incorrect email or password.");
            }
            
        } else {
            throw new customError("Authentication failed.");
        }
    } catch (error) {
        next(error);
    }
};


const validatePassword = (user, password) => {
    password = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");

    return bcrypt.compareSync(password, user[0].password);
};
