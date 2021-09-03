class customError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400
        this.name = "CustomError"
    }
}

module.exports = customError;