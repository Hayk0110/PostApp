import api from "../api";

export default class PostService {
    static getPosts = async ({ currentPage, category, date, sort, author = "" }) => {
        const url = `/post?category=${category}&sort=${sort}&date=${date}&page=${currentPage}&limit=2`

        if(author){
            console.log("im here")
            url = url + `&author=${author}`
        }

        const res = await api.get(`/posts?category=${category}&sort=${sort}&date=${date}&page=${currentPage}&limit=2`);

        return res.data;
    }
}