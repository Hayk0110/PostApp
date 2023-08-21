const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const UserDto = require("../dtos/user-dto");
const PostDto = require("../dtos/post-dto");
const commentService = require("../services/comment-service");
const sortData = require("../utils/index");
const ApiError = require("../exceptions/api-error");
const userService = require("./user-service");

class PostService {

  async getAllPosts(query) {
    const { sort, page, limit, ...filterQuery } = query

    const posts = await Post.find(filterQuery)

    let postDtos = await Promise.all(posts.map(async (post) => {
      const comments = await Promise.all(post.comments.map(async (el) => {
        return await commentService.getComment(el._id)
      }));

      const user = await userService.getUserById(post.userId);

      const postDto = new PostDto(post, comments, user);
      return postDto;
    }));

    // postDtos = sortData(postDtos, sort)

    return postDtos;
  }

  async addPost(userId, title, text, category) {
    const post = await Post.create({ userId, title, text, category });
    const postDto = new PostDto(post);

    return postDto;
  }

  async updatePost(id, title, text, category) {
    if (category?.trim() === "" || title?.trim() === "" || text?.trim() === "") {
      throw ApiError.BadRequest("blanks can not be empty")
    }

    const post = await Post.findByIdAndUpdate(id, { title, text, category });

    return post
  }

}



module.exports = new PostService()