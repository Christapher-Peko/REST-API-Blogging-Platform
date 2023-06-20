import asyncHandler from 'express-async-handler';
import { ERROR } from '../utils/errors.js';
import blogRepositories from '../repositories/blogRepositories.js';
import { ObjectId } from 'mongodb';
const blogController = {
    /**
     * @desc Create a new blog
     * @route  POST /api/v1/blogs
     * @access privet
     */
    createBlog: asyncHandler(async (req, res, next) => {
        const { title, content, tags } = req.body;
        const { userId: author } = req.currentUser

        // Create blog
        const blogData = { title, content, author, tags };
        const blog = await blogRepositories.createBlog(blogData);
         await blogRepositories.createLikeAndComment(blog._id)

        return res.success(201, 'Blog created successfully', blog);
    }),

    /**
     * @desc Get all blogs
     * @route  GET /api/v1/blogs
     * @access Public
     */
    getAllBlogs: asyncHandler(async (req, res, next) => {
        const { page, limit } =req.query
        const blogs = await blogRepositories.getAllBlogs(page, limit);
        return res.success(200, 'Blogs retrieved successfully', blogs);
    }),




    /**
     * @desc Get a blog by ID
     * @route  GET /api/v1/blogs/:id
     * @access Public
     */
    getBlogById: asyncHandler(async (req, res, next) => {
        const blogId = req.params.id;


        const blog = await blogRepositories.getBlogById(blogId);

        if (!blog) {
            throw new ERROR.NotFoundError('Blog not found');
        }

        return res.success(200, 'Blog retrieved successfully', blog);
    }),





    /**
     * @desc Update a blog
     * @route  PUT /api/v1/blogs/:id
     * @access privet
     */
    updateBlog: asyncHandler(async (req, res, next) => {
        const { title, content } = req.body;
        const blogId = req.params.id;
        const userId = req.currentUser.userId;

        if (!blogId) {
            throw new ERROR.BadRequestError('Blog id required');
        }

        // Retrieve the blog from the data storage
        const blog = await blogRepositories.getBlogById(blogId);

        // Check if the blog exists
        if (!blog) {
            throw new ERROR.NotFoundError('Blog not found..');
        }


        if (blog.author._id.toString() !== userId) {
            // User is not authorized to delete the blog
            throw new ERROR.ForbiddenError('You are not authorized to edit this blog');
        }


        const updatedData = { title, content };
        const updatedBlog = await blogRepositories.updateBlog(blogId, updatedData);

        if (!updatedBlog) throw new ERROR.NotFoundError('Blog not found');

        return res.success(200, 'Blog updated successfully', updatedBlog);
    }),



    /**
     * @desc Delete a blog
     * @route  DELETE /api/v1/blogs/:id
     * @access Private
     */
    deleteBlog: asyncHandler(async (req, res, next) => {
        const blogId = req.params.id;
        const userId = req.currentUser.userId;

        if (!blogId) throw new ERROR.BadRequestError('Blog id required');


        // Retrieve the blog from the data storage
        const blog = await blogRepositories.getBlogById(blogId);

        // Check if the blog exists
        if (!blog) {
            throw new ERROR.NotFoundError('Blog not found');
        }

        if (blog.author._id.toString() !== userId) {
            // User is not authorized to delete the blog
            throw new ERROR.ForbiddenError('You are not authorized to delete this blog');
        }

        // Delete the blog
        const deletedBlog = await blogRepositories.deleteBlog(blogId);

        // Check if the blog was successfully deleted
        if (!deletedBlog) {
            throw new ERROR.NotFoundError('Blog not deleted successfully');
        }

        return res.success(200, 'Blog deleted successfully');
    }),
};

export default blogController;
