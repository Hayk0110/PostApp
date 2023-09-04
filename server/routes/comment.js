const router = require("express").Router()
const commentController = require("../controllers/comment-controllers");
const authMiddleware = require("../middlewares/auth-middleware")

router.post("/add", authMiddleware,commentController.addComment);
router.put("/:id", authMiddleware,commentController.updateComment);
router.delete("/",authMiddleware, commentController.deleteComment);

module.exports = router;