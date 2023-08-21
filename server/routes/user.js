const router = require("express").Router();
const userController = require("../controllers/user-controller")
const validateMiddleware = require("../middlewares/validate-middleware");


router.post("/registration", userController.registration ,validateMiddleware);
router.post("/login", userController.login, validateMiddleware);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.post("/", userController.getUser);

module.exports = router;