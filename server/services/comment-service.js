const Comment = require("../models/Comment");
const Post = require("../models/Post");
const ApiError = require("../exceptions/api-error");
const CommentDto = require("../dtos/comment-dto");

class CommentService {
    async addComment(userId, postId, text, rate) {
        let comment = await Comment.create({ userId, postId, text, rate });

        comment = await comment.populate("userId");

        await Post.findOneAndUpdate({ _id: postId }, { $push: { comments: comment } })
        
        const commentDto = new CommentDto(comment);
        return commentDto;
    }

    async updateComment(id, text, rate) {
        const comment = await Comment.findByIdAndUpdate(id, { text, rate }, {new: true})
        .populate("userId");

        const commentDto = new CommentDto(comment);
        
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
}

module.exports = new CommentService();