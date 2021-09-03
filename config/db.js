require("dotenv").config();

const mySql = require("mysql2/promise");

const dbConnPool = mySql.createPool({
    connectionLimit: 15,
    multipleStatements: true,
    host: process.env.MYSQL_URL,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_DBUSER,
    password: process.env.MYSQL_DBPWD,
    database: process.env.MYSQL_DEFAULT_DB,
    charset: "utf8mb4_unicode_ci"
});

// connect to database
dbConnPool.getConnection(function (err, conn) {
    if (!err) {
        console.log(`*** CONNECTED TO DATABASE ***: ${process.env.MYSQL_DEFAULT_DB}`);
        createDatabase();
    } else {
        console.error(`Error connecting database`);
    }
});

dbConnPool.on("acquire", function(connection) {
    console.log("*** CONNECTION %d ACQUIRED ***", connection.threadId, new Date().toString());
});

dbConnPool.on("release", function(connection) {
    console.log("*** CONNECTION %d RLEASED ***", connection.threadId, new Date().toString());
});

module.exports = {
    mySql,
    dbConnPool,
};
