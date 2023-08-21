module.exports = class PostDto{
    id;
    text;
    rate;
    postId;
    user;
    createdAt;

    constructor(model, user){
        this.id = model._id;
        this.rate = model.rate;
        this.text = model.text;
        this.user = user;
        this.postId = model.postId;
        this.createdAt = model.createdAt
    }
}