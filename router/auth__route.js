const { Router } = require("express");
const authController = require("../controller/auth__controller");
const router = Router();

router.post("/login", authController.login_post);
router.post("/register", authController.register_post);


module.exports = router;