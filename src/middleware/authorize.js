const authorize = (requiredRoles) => (req, res, next) => {
    const currentUser = req.currentUser;
    if (!currentUser) {
        return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }
    next();
};

export default authorize;
