const router = require("express").Router()
const commentController = require("../controllers/comment-controllers");

router.post("/add", commentController.addComment);
router.put("/:id", commentController.updateComment);
router.delete("/", commentController.deleteComment);

module.exports = router;