const loginController = require("../authenticate/login/login_controller");
const registerController = require("../authenticate/register/register_controller");
const { loginSchema } = require("../authenticate/login/login_schema");

module.exports = router => {
    // Email Login
    router.route("/authenticate/login").post(loginSchema.login, loginController.login);

    // Register
    router.route("/authenticate/register").post(registerController.register);
};
