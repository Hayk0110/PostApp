import api from "../api";

export default class CommentService{
    static addComment = async( newComment ) =>{

        const res = await api.post("/comments/add", newComment);
        
        return res.data;
    }

    static updateComment = async (commentId, text, rate) =>{
        const res = await api.put(`/comments/${commentId}`, {text, rate});

        return res.data;
    }

    static deleteComment = async(userId, commentId) => {
        const res = await api.delete("/comments", {data: {commentId, userId}});
        return res.data;
    }
}