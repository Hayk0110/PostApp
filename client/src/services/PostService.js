import api from "../api";

export default class PostService {
    static getPosts = async ({ currentPage, category, date, sort, author }) => {
        let url = `/posts?category=${category}&sort=${sort}&date=${date}&page=${currentPage}&limit=2`

        if(author){
            url = url + `&author=${author}`
        }

        const res = await api.get(url);

        return res.data;
    }
}