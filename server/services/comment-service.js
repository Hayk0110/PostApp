const Comment = require("../models/Comment");
const Post = require("../models/Post");
const ApiError = require("../exceptions/api-error");
const CommentDto = require("../dtos/comment-dto");
const userService = require("../services/user-service")

class CommentService {
    async addComment(userId, postId, text, rate) {
        const comment = await Comment.create({ userId, postId, text, rate });

        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment } })

        const user = await userService.getUserById(userId);

        const commentDto = new CommentDto(comment, user);
        return commentDto;
    }

    async updateComment(id, text, rate) {
        const comment = await Comment.findByIdAndUpdate(id, { text, rate }, {new: true});

        const user = await userService.getUserById(comment.userId);

        const commentDto = new CommentDto(comment,user);
        
        return commentDto;
    }

    async deleteComment(userId, commentId) {
        const comment = await Comment.findById(commentId);

        if (comment.userId == userId) {
            await comment.deleteOne({ _id: commentId });
            await Post.findOneAndUpdate({ comments: commentId }, { $pull: { comments: commentId } })
        } else {
            throw ApiError.BadRequest("You cant delete this comment")
        }

        return comment;
    }


    async getComment(commentId) {
        const comment = await Comment.findById(commentId);

        const user = await userService.getUserById(comment.userId);

        const commentDto = new CommentDto(comment, user);
        return commentDto;
    }
}

module.exports = new CommentService();