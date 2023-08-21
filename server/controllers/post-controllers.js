const postService = require("../services/post-service");
const { validateAddPost, validateUpdatePost } = require("../validation/schemas/postSchemas");

class PostController {

    async getPosts(req, res, next) {
        try {
            const query = req.queryParams;
            const posts = await postService.getAllPosts(query);

            const results = {};

            results.data = posts

            next(results);
        } catch (e) {
            next(e)
        }
    }

    async addPost(req, res, next) {
        try {
            const { error } = validateAddPost(req.body);

            if (error) {
                return next(error.details)
            }

            const { userId, title, text, category } = req.body
            const newPost = await postService.addPost(userId, title, text, category)
            res.json(newPost)
        } catch (e) {
            next(e)
        }

    }

    async updatePost(req, res, next) {
        try {
            const { error } = validateUpdatePost(req.body)

            if (error) {
                return next(error.details);
            }

            const { id } = req.params
            const { title, text, category } = req.body
            const updatedPost = await postService.updatePost(id, title, text, category)
            res.json(updatedPost)
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new PostController();