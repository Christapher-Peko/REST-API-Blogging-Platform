import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import { ERROR } from "../utils/errors.js";

const blogRepositories = {
    createBlog: async (blogData) => {
        const blog = new Blog(blogData);
        await blog.save();

        const populatedBlog = await blog.populate([
            { path: 'author' },
            { path: 'likes', select: '-_id totalLikes' },
            { path: 'comments', select: '-_id totalComments' }
        ])

        return populatedBlog;
    },

    deleteBlog: async (blogId) => {
        return await Blog.findByIdAndDelete(blogId);
    },

    getAllBlogs: async (page, limit) => {
        const pageNumber = parseInt(page) || 1;
        const pageSize = parseInt(limit) || 10;
        const totalCount = await Blog.countDocuments();

        const blogs = await Blog.find()
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .populate([
                { path: 'author' },
                { path: 'likes', select: '-_id totalLikes' },
                { path: 'comments', select: '-_id totalComments' }
            ])
        return {
            meta: {
                pageNumber: pageNumber,
                itemsPerPage: pageSize,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            },
            data: blogs,
        };
    },

    getBlogById: async (blogId) => {
        return await Blog.findById(blogId)
            .populate([
                { path: 'author' },
                { path: 'likes', select: '-_id totalLikes' },
                { path: 'comments', select: '-_id totalComments' }
            ]);
    },


    updateBlog: async (blogId, updatedData) => {
        return await Blog.findByIdAndUpdate(blogId, updatedData, { new: true })
            .populate([
                { path: 'author' },
                { path: 'likes', select: '-_id totalLikes' },
                { path: 'comments', select: '-_id totalComments' }
            ]);
    },

    createLikeAndComment: async (blogId) => {
        const doc = new Like({ _id: blogId });
        await doc.save();

        const docs = new Comment({ _id: blogId });
        await docs.save();

    },


    likeBlog: async (blogId, userId) => {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new ERROR.NotFoundError('Blog not found')
        }

        const like = await Like.findOne({ _id: blogId });
        if (!like) {
            throw new ERROR.NotFoundError('Like data not found')
        }

        const existingLike = like.likes.find(like => like.userId.toString() === userId.toString());
        if (existingLike) {
            throw new ERROR.ConflictError('User has already liked the blog')
        }

        like.likes.push({ userId });
        like.totalLikes++;
        await like.save();

        return await Blog.findById(blogId)
            .populate([
                { path: 'author' },
                { path: 'likes', select: '-_id totalLikes' },
                { path: 'comments', select: '-_id totalComments' }
            ]);
    },

    commentBlog: async (blogId, comment, userId) => {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            throw new ERROR.NotFoundError('Blog not found')
        }

        const comments = await Comment.findOne({ _id: blogId });
        if (!comments) {
            throw new ERROR.NotFoundError('Comment data not found')
        }

        comments.comments.push({ userId, comment });
        comments.totalComments++;
        await comments.save();

        return await Blog.findById(blogId)
            .populate([
                { path: 'author' },
                { path: 'likes', select: '-_id totalLikes' },
                { path: 'comments', select: '-_id totalComments' }
            ]);
    },


};

export default blogRepositories;


