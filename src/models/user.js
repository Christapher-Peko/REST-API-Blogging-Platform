import mongoose from 'mongoose';
const { Schema } = mongoose;


const UserSchema = new Schema(
    {
        user_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

    }
);

UserSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
    },
});

const User = mongoose.model('User', UserSchema);
export default User;

