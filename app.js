const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const isUndefined = require("lodash/isUndefined");
const routes = require("./src/modules/index");
const router = express.Router();
const customError = require("./src/utils/custom_error");
const { dbConnPool } = require("./config/db");

routes(router);

const app = express();

app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use(async (req, res, next) => {
    try {
        const userId = req.body.loggedInUserId;

        if (!userId) {
            next();
        }
        else {
            // Verify user is active
            const [userStatus, userStatusFields] = await dbConnPool.query(
                `SELECT * FROM basic_user WHERE id=? AND is_active=1`,
                userId
            );

            if (userStatus.length > 0) {
                next();
            }
            else {
                throw new customError("Invalid Email");
            }
        }
    } catch (error) {
        next(error);
    }
});

app.use("/api", router);

// Default error handling: Should be after other app.use().
app.use((error, req, res, next) => {
    console.log("\n[Error API]: ", req.path, "\n");
    console.log(error.message);
    let errorMessage = error.message ? error.message : "There is an error in the backend. Please try again in a few minutes. \nOtherwise, contact our support below.";

    if (!isUndefined(error.data)) {
        // Error message from Joi validator.
        errorMessage = error.data[0].message.replace(/"/g, "");
        // errorMessage = "There is an error in the backend. Please try again in a few minutes. Otherwise, contact our support below.";
    }

    if (!isUndefined(error.name) && error.name === "CustomError") {
        // Error message from custom_error.js
        errorMessage = error.message;
        // errorMessage = "There is an error in the backend. Please try again in a few minutes. Otherwise, contact our support below.";
    }

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send({
        statusCode: error.statusCode || 400,
        errorMessage: errorMessage,
    });
});

module.exports = { app };
