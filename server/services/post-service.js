const Post = require("../models/Post")
const PostDto = require("../dtos/post-dto");
const sortData = require("../utils/index");

class PostService {

  async getAllPosts(query) {
    const { sort, page, limit, ...filterQuery } = query

    const posts = await Post.find(filterQuery)
      .populate([{
        path: "comments",
        populate: {
          path: "userId"
        }
      }, "userId"]);

    let postDtos = posts.map(post => {
      return new PostDto(post);
    })

    postDtos = sortData(postDtos, sort)

    return postDtos;
  }

  async addPost(userId, title, text, category) {
    let post = await Post.create({ userId, title, text, category });

    post = await post.populate([{
      path: "comments",
      populate: {
        path: "userId"
      }
    }, "userId"]);

    const postDto = new PostDto(post);

    return postDto;
  }

  async updatePost(id, title, text, category) {
    const post = await Post.findByIdAndUpdate(id, { title, text, category });

    return post
  }

}



module.exports = new PostService()