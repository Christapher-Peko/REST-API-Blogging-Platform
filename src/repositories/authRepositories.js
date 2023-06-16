import User from "../models/user.js";


const authRepositories = {
    findUserByEmail: async (email) => {
        return await User.findOne({ email });;
    },

    createUser: async (userEntity) => {
        console.log(userEntity);
        const user = new User(userEntity);
        return await user.save();
    },

};

export default authRepositories;
