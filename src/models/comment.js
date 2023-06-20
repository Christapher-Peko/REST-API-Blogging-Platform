import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            required: true,
        },
        commentedDate: {
            type: Date,
            default: Date.now,
        },
    }],
    totalComments: {
        type: Number,
        default: 0
    }
});
commentSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    },
});

const Comment = mongoose.model('Comment', commentSchema); // Register the Comment model

export default Comment;



