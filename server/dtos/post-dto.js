const UserDto = require("./user-dto")
const CommentDto = require("./comment-dto")

module.exports = class PostDto{
    id;
    title;
    text;
    category;
    user;
    comments;
    createdAt;

    constructor(model){
        this.id = model._id;
        this.title = model.title;
        this.text = model.text;
        this.category = model.category
        this.user = new UserDto(model.userId);
        this.comments = model.comments.map(comment => new CommentDto(comment));
        this.createdAt = model.createdAt
    }
}