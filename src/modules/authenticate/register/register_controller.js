const {
    dbConnPool
} = require("../../../../config/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const customResponse = require("../../../utils/custom_response");
const customError = require("../../../utils/custom_error");


exports.register = async (req, res, next) => {
    const connection = await dbConnPool.getConnection();
    try {
        // customResponse.success(res, {
        //     user
        // });

    } catch (error) {
        await connection.rollback();
        connection.release();
        next(error);
    } finally {
        connection.release();
    }
};
