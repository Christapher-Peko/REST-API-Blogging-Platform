import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        publishedDate: {
            type: Date,
            default: Date.now,
        },
        tags: {
            type: [String],
            default: [],
        },
        featuredImage: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
        },
        comments: [
            {
                author: {
                    type: String,
                },
                content: {
                    type: String,
                },
                timestamp: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

    }
);

blogPostSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;






