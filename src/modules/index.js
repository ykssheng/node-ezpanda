
const authenticateRoute = require("./authenticate/authenticate_route");
const profileRoute = require("./profile/profile_route");

module.exports = router => {
    authenticateRoute(router);
    profileRoute(router);
};
