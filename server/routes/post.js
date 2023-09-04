const router = require("express").Router();
const postController = require("../controllers/post-controllers");
const authMiddleware = require("../middlewares/auth-middleware");
const paginationMiddleware = require("../middlewares/pagination-middleware");
const queryMiddleware = require("../middlewares/query-middleware");


router.get("/", queryMiddleware, postController.getPosts, paginationMiddleware);
router.post("/", authMiddleware,postController.addPost);
router.put("/:id", authMiddleware,postController.updatePost);
module.exports = router;