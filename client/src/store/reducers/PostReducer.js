import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import PostService from "../../services/PostService"
import { changeTotalPages } from "./PaginationReducer";
import CommentService from "../../services/CommentService";

const initialState = {
    posts: [],
    loading: false,
    error: false,
}

export const fetchPosts = createAsyncThunk("posts/fetch", async (params, { dispatch }) => {
    try {
        const res = await PostService.getPosts(params);
        dispatch(changeTotalPages(res.pagination))
        return res.data
    } catch (err) {
        throw err.message
    }

})

export const addPost = createAsyncThunk("posts/add", async (params, { dispatch, getState }) => {
    try {
        await PostService.addPost(params);
        const { category, date, sort } = getState().filter
        const { user } = getState().auth
        dispatch(fetchPosts({ currentPage: 1, category, date, sort, author: user.email }))
    } catch (err) {
        throw err.message
    }
})

export const updatePost = createAsyncThunk("posts/update", async (params, { dispatch, getState }) => {
    try {
        if(params.hasOwnProperty("published")){
            await PostService.publishPost(params);
        }else{
            await PostService.updatePost(params);
        }

        const { category, date, sort } = getState().filter
        const { user } = getState().auth
        dispatch(fetchPosts({ currentPage: 1, category, date, sort, author: user.email }))
    } catch (err) {
        throw err.message
    }
})

export const addComment = createAsyncThunk("posts/add-comment", async (payload, { getState }) => {
    try {
        const comment = await CommentService.addComment(payload);

        const { posts } = getState().posts;

        let updatedPosts = posts.map((post) => {
            if (post.id == payload.postId) {
                return {
                    ...post,
                    comments: [...post.comments, comment]
                }
            } else {
                return post;
            }
        }
        );

        return updatedPosts
    } catch (err) {
        console.log(err)
    }
})

export const updateComment = createAsyncThunk("posts/update-comment", async (payload, { getState }) => {
    try {
        const { commentId, text, rate } = payload

        const updatedComment = await CommentService.updateComment(commentId, text, rate);

        const { posts } = getState().posts;

        const updatedPosts = posts.map(post => {
            if (post.id == payload.postId) {
                const updatedComments = post.comments.map(comment => {
                    if (comment.id == commentId) {
                        return updatedComment;
                    } else {
                        return comment;
                    }
                });
                return { ...post, comments: updatedComments };
            } else {
                return post;
            }
        })

        return updatedPosts;

    } catch (err) {
        console.log(err);
        return;
    }
})

export const deleteComment = createAsyncThunk("posts/delete-comment", async (payload, { getState }) => {
    try {
        const { postId, commentId, userId } = payload;

        await CommentService.deleteComment(userId, commentId);

        const { posts } = getState().posts;

        let updatedPosts = posts.map((post) => {
            if (post.id == postId) {
                return {
                    ...post,
                    comments: post.comments.filter(com => com.id != commentId)
                }
            } else {
                return post;
            }
        }
        );

        return updatedPosts
    } catch (err) {
        console.log(err)
    }
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts = action.payload
                state.loading = false
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false
                state.error = true
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.posts = action.payload
            })
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.loading = false
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.posts = action.payload
            })
    }
})

export default postSlice.reducer;