import api from "../api";

export default class PostService {
    static getPosts = async ({ currentPage, category, date, sort, author, title, published }) => {
        let url = `/posts?category=${category}&sort=${sort}&date=${date}&page=${currentPage}&limit=2`

        if (author) {
            url = url + `&author=${author}`
        }

        if(title){
            url = url + `&title=${title}`
        }

        if(published){
            url = url + `&published=true`
        }

        const res = await api.get(url);

        return res.data;
    }

    static addPost = async (newPost) => {
        const res = await api.post("/posts/", newPost);

        return res;
    }

    static updatePost = async ({title, text, postCategory, postId}) => {
        const res = await api.put(`/posts/${postId}`, {title, text, category: postCategory});

        return res;
    }

    static publishPost = async ({published, postId}) => {
        const res = await api.put(`/posts/${postId}`, {published});

        return res;
    }
}