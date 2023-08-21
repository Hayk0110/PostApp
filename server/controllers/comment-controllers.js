const commentService = require("../services/comment-service");
const Post = require("../models/Post");
const { validateAddComment, validateUpdateComment, validateDeleteComment } = require("../validation/schemas/commentSchemas");

class CommentController {
    async addComment(req, res, next) {
        try {
            const { error } = validateAddComment(req.body)

            if (error) {
                return next(error.details)
            }

            const { userId, postId, text, rate } = req.body
            const newComment = await commentService.addComment(userId, postId, text, rate);

            res.json(newComment)
        } catch (e) {
            next(e)
        }
    }

    async updateComment(req, res, next) {
        try {
            const { error } = validateUpdateComment(req.body);

            if (error) {
                return next(error.details)
            }

            const { id } = req.params
            const { text, rate } = req.body

            const updatedComment = await commentService.updateComment(id, text, rate);

            res.json(updatedComment);
        } catch (e) {
            next(e)
        }
    }

    async deleteComment(req, res, next) {
        try {
            const {error} = validateDeleteComment(req.body);

            if(error){
                return next(error.details);
            }

            const { commentId, userId } = req.body;
            const deletedComment = await commentService.deleteComment(userId, commentId)

            res.json(deletedComment)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new CommentController();