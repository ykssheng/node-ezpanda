const {
    dbConnPool
} = require("../../../config/db");
const customResponse = require("../../utils/custom_response");
const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const customError = require("../../utils/custom_error");


exports.getUserDetail = async (req, res, next) => {
    try {
        // const userId = req.body.id;
        const params = pick(req.body, ["id"]);

        const [userDetail, userDetailFields] = await dbConnPool.query(
            `SELECT 
            users.id,
            users.first_name,
            users.last_name,
            users.email,
            users.phone_number,
            users.short_bio,
            users.linkedin_url,
            attachment.file_name,
            attachment.file_path,
            attachment2.file_name AS cv_file_name,
            attachment2.file_path AS cv_file_path,
            attachment2.original_name,
            users.login_type,
            users.phone_country_code,
            users.phone_dial_code,
            users.email_changed_token
        FROM basic_user users
        LEFT JOIN basic_user_attachment attachment ON users.id=attachment.user_id
        AND attachment.attachment_type=1
        LEFT JOIN basic_user_attachment attachment2 ON users.id=attachment2.user_id
        AND attachment2.attachment_type=2
        WHERE users.id=?`, [params.id]
        );

        
    } catch (error) {
        next(error);
    }
};
