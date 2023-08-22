const UserDto = require("./user-dto")

module.exports = class CommentDto{
    id;
    text;
    rate;
    postId;
    user;
    createdAt;

    constructor(model){
        this.id = model._id;
        this.rate = model.rate;
        this.text = model.text;
        this.user = new UserDto(model.userId);
        this.postId = model.postId;
        this.createdAt = model.createdAt
    }
}