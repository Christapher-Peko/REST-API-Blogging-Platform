import asyncHandler from 'express-async-handler';
import { ERROR } from '../utils/errors.js';
import blogRepositories from '../repositories/blogRepositories.js';

const blogController = {
    /**
     * @desc Create a new blog
     * @route  POST /api/v1/blogs
     * @access Public
     */
    createBlog: asyncHandler(async (req, res, next) => {
        const { title, content, tags } = req.body;
        const { userId: author } = req.currentUser

        // Create blog
        const blogData = { title, content, author, tags };
        const blog = await blogRepositories.createBlog(blogData);

        return res.success(201, 'Blog created successfully', blog);
    }),

    /**
     * @desc Get all blogs
     * @route  GET /api/v1/blogs
     * @access Public
     */
    getAllBlogs: asyncHandler(async (req, res, next) => {
        const blogs = await blogRepositories.getAllBlogs();
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
     * @access Public
     */
    updateBlog: asyncHandler(async (req, res, next) => {
        const blogId = req.params.id;
        const { title, content } = req.body;

        const updatedData = { title, content };
        const updatedBlog = await blogRepositories.updateBlog(blogId, updatedData);

        if (!updatedBlog) {
            throw new ERROR.NotFoundError('Blog not found');
        }

        return res.success(200, 'Blog updated successfully', updatedBlog);
    }),

    /**
     * @desc Delete a blog
     * @route  DELETE /api/v1/blogs/:id
     * @access Public
     */
    deleteBlog: asyncHandler(async (req, res, next) => {
        const blogId = req.params.id;
        const deletedBlog = await blogRepositories.deleteBlog(blogId);

        if (!deletedBlog) {
            throw new ERROR.NotFoundError('Blog not found');
        }

        return res.success(200, 'Blog deleted successfully', null);
    }),
};

export default blogController;
