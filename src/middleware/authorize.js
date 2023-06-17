import { ERROR } from "../utils/errors.js";

const authorize = () => (req, res, next) => {
    const currentUser = req.currentUser;
    if (!currentUser) {
        throw new ERROR.InvalidTokenError("Unauthorized: User not authenticated")
    }
    next();
};

export default authorize;
