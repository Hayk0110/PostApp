const router = require("express").Router();
const userController = require("../controllers/user-controller")
const validateMiddleware = require("../middlewares/validate-middleware");


router.post("/registration", userController.registration);
router.post("/login",  userController.login );
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/", userController.getUser);

module.exports = router;