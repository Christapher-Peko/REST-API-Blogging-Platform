import Blog from "../models/blog.js";

const blogRepositories = {
    createBlog: async (blogData) => {
        const blog = new Blog(blogData);
        return await blog.save();
    },

    deleteBlog: async (blogId) => {
        return await Blog.findByIdAndDelete(blogId);
    },

    getAllBlogs: async () => {
        return await Blog.find();
    },

    getBlogById: async (blogId) => {
        return await Blog.findById(blogId);
    },

    updateBlog: async (blogId, updatedData) => {
        return await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });
    },
};

export default blogRepositories;
