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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like', 
        },
        comments: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        },

    }
);

blogPostSchema.pre('save', async function (next) {
    if (!this.likes) {
        this.likes = this._id;
    }
    if (!this.comments) {
        this.comments = this._id;
    }
    next();
});

blogPostSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    },
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;






