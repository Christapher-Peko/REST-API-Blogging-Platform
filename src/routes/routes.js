import authRouter from "./authRoutes.js";
import blogRouter from "./blogRoutes.js";


export const routes = (app, router) => {

  app.use('/api/v1/auth', authRouter(router));
  
  app.use('/api/v1/blogs', blogRouter(router));

};

export default routes