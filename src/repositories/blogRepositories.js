import Blog from "../models/blog.js";

const blogRepositories = {

    createBlog: async (blogData) => {
        const blog = new Blog(blogData);
        await blog.save();
        return  await blog.populate('author')
    },

    deleteBlog: async (blogId) => {
        return await Blog.findByIdAndDelete(blogId);
    },

    getAllBlogs: async () => {
        return await Blog.find().populate('author');
    },

    getBlogById: async (blogId) => {
        return await Blog.findById(blogId).populate('author');
    },
    

    updateBlog: async (blogId, updatedData) => {
        return await Blog.findByIdAndUpdate(blogId, updatedData, { new: true }).populate('author');
    },
};

export default blogRepositories;
