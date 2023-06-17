import blogController from "../controllers/blogController.js";
import authorize from "../middleware/authorize.js";
import { validateCreateBlog } from "../middleware/validate.js";

const blogRouter = (router) => {
  /**
   * @openapi
   * '/api/v1/blogs':
   *   get:
   *     tags:
   *       - Blogs
   *     summary: Get all blogs
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetAllBlogsResponse'
   *       500:
   *         description: Internal server error
   */
  router.route('/').get(blogController.getAllBlogs);

  /**
   * @openapi
   * '/api/v1/blogs':
   *   post:
   *     tags:
   *       - Blogs
   *     summary: Create a new blog
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBlogInput'
   *     responses:
   *       201:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateBlogResponse'
   *       400:
   *         description: Bad request
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
   */
  router.route('/').post(authorize(), validateCreateBlog, blogController.createBlog);


  /**
   * @openapi
   * '/api/v1/blogs/:id':
   *   get:
   *     tags:
   *       - Blogs
   *     summary: Get a blog by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the blog
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetBlogByIdResponse'
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  router.route('/:id').get(blogController.getBlogById);

  /**
   * @openapi
   * '/api/v1/blogs/:id':
   *   put:
   *     tags:
   *       - Blogs
   *     summary: Update a blog by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the blog
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBlogInput'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateBlogResponse'
   *       400:
   *         description: Bad request
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  router.route('/:id').put(authorize(), blogController.updateBlog);


  /**
   * @openapi
   * '/api/v1/blogs/:id':
   *   delete:
   *     tags:
   *       - Blogs
   *     summary: Delete a blog by ID
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the blog
   *     responses:
   *       204:
   *         description: Success
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal server error
   */
  router.route('/:id').delete(authorize(), blogController.deleteBlog);

  return router;
}

export default blogRouter;



