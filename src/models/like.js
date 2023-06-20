import mongoose from 'mongoose';
const { Schema } = mongoose;

const likeSchema = new Schema({
    likes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        likedDate: {
            type: Date,
            default: Date.now,
        },
    }],
    totalLikes: {
        type: Number,
        default: 0
    }
});

likeSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
    },
});

const Like = mongoose.model('Like', likeSchema);
export default Like;
