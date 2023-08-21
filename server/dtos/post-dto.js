module.exports = class PostDto{
    id;
    title;
    text;
    category;
    user;
    comments;
    createdAt;

    constructor(model, comments = this.comments, user){
        this.id = model._id;
        this.title = model.title;
        this.text = model.text;
        this.category = model.category
        this.user = user;
        this.comments = comments;
        this.createdAt = model.createdAt
    }
}