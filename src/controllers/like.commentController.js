import asyncHandler from 'express-async-handler';
import { ERROR } from '../utils/errors.js';
import authRepositories from '../repositories/authRepositories.js';
import authServices from '../services/authServices.js';
import blogRepositories from '../repositories/blogRepositories.js';

const likeCommentController = {
    /**
     * @desc authenticated user can like a post
     * @route  POST /api/v1/blogs/:id/like
     * @access private 
     */
    likeBlog: asyncHandler(async (req, res, next) => {

        const { id: blogID } = req.params
        const { userId } = req.currentUser

        const likedBlog= await blogRepositories.likeBlog(blogID, userId)
       

        return res.success(200, 'Blog liked successfully',likedBlog);
    }),

    addComment: asyncHandler(async (req, res, next) => {
        const { id: blogID } = req.params
        const { comment } = req.body
        const { userId } = req.currentUser

       

       const commentedBlog= await blogRepositories.commentBlog(blogID,comment,userId)


        return res.success(200, 'Blog Commented successfully',commentedBlog);
    }),




};



export default likeCommentController;
