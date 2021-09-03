const profileController = require("../profile/profile_controller");
const auth = require("../../utils/middleware");

module.exports = router => {
    // Get user profile details
    router.route("/profile/get-user-detail").post(profileController.getUserDetail);
    
}