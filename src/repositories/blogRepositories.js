import Blog from "../models/blog.js";

const blogRepositories = {

    createBlog: async (blogData) => {
        const blog = new Blog(blogData);
        await blog.save();
        return await blog.populate('author')
    },

    deleteBlog: async (blogId) => {
        return await Blog.findByIdAndDelete(blogId);
    },

    getAllBlogs: async (page, limit) => {

        const pageNumber = parseInt(page) || 1; // Parse the page number (default: 1)
        const pageSize = parseInt(limit) || 10; // Parse the page size (default: 10)

        const totalCount = await Blog.countDocuments(); // Get the total count of blogs

        const blogs = await Blog.find()
            .populate('author')
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        return {
            meta: {
                pageNumber: pageNumber,
                itemsPerPage: pageSize,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
            },
            data: blogs,

        }

    },

    // getAllBlogs: async () => {
    //     return await Blog.find().populate('author');
    // },

    getBlogById: async (blogId) => {
        return await Blog.findById(blogId).populate('author');
    },


    updateBlog: async (blogId, updatedData) => {
        return await Blog.findByIdAndUpdate(blogId, updatedData, { new: true }).populate('author');
    },
};

export default blogRepositories;
