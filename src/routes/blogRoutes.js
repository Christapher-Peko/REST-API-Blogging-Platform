import blogController from "../controllers/blogController.js";
import likeCommentController from "../controllers/like.commentController.js";
import authorize from "../middleware/authorize.js";
import { validateComment, validateCreateBlog } from "../middleware/validate.js";

const blogRouter = (router) => {


  /**
   * @openapi
   * '/api/v1/blogs':
   *   get:
   *     tags:
   *       - Blogs
   *     summary: Get all blogs
   *     description: |
   *       Use this endpoint to retrieve all blogs. You can optionally provide the `page` and `limit` query parameters for pagination. The `page` parameter indicates the page number, and the `limit` parameter specifies the number of blogs to return per page.
   *       Example: `/api/v1/blogs?page=1&limit=10` retrieves the first page of 10 blogs.
   *  
   *       If no `page` and `limit` parameters are provided, the default values are used (page: 1, limit: 10).
   *
   *       The response includes the array of blogs and pagination metadata in the `meta` field, including the total count of blogs, current page number, page size, and total number of pages.
   *
   *       Pagination metadata example:
   *       ```
   *       "meta": {
   *         "total": 50,
   *         "page": 1,
   *         "pageSize": 10,
   *         "totalPages": 5
   *       }
   *       ```
   *
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *         description: The page number for pagination.
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *         description: The number of blogs to return per page.
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetAllBlogsResponse'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
   */
  router.route('/').get(blogController.getAllBlogs);



  /**
   * @openapi
   * '/api/v1/blogs':
   *   post:
   *     tags:
   *       - Blogs
   *     summary: Create a new blog
   *     description: Use this endpoint to create a new blog.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBlogInput'
   *     responses:
   *       201:
   *         description: Blog created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateBlogResponse'
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       422:
   *         description: Validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/').post(authorize(), validateCreateBlog, blogController.createBlog);



  /**
   * @openapi
   * '/api/v1/blogs/{id}':
   *   get:
   *     tags:
   *       - Blogs
   *     summary: Get a blog by ID
   *     description: Retrieve a blog by specifying its unique ID. This endpoint allows you to fetch a specific blog based on its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog to retrieve.
   *     responses:
   *       200:
   *         description: Successful operation. Returns the requested blog.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/GetBlogByIdResponse'
   *       400:
   *         description: Invalid blog ID provided.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: The requested blog was not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/:id').get(blogController.getBlogById);

  /**
   * @openapi
   * '/api/v1/blogs/{id}':
   *   put:
   *     tags:
   *       - Blogs
   *     summary: Update a blog by ID
   *     description: Update an existing blog by specifying its unique ID. This endpoint allows modifying the content of a specific blog.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog to update.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBlogInput'
   *     responses:
   *       200:
   *         description: Successful operation. Returns the updated blog.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UpdateBlogResponse'
   *       400:
   *         description: The request is malformed or invalid.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: The requested blog was not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/:id').put(authorize(), blogController.updateBlog);


  /**
   * @openapi
   * '/api/v1/blogs/{id}':
   *   delete:
   *     tags:
   *       - Blogs
   *     summary: Delete a blog by ID
   *     description: Delete an existing blog by specifying its unique ID. This endpoint allows removing a specific blog from the system.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog to delete.
   *     responses:
   *       204:
   *         description: Successful operation. The blog has been successfully deleted.
   *       400:
   *         description: The request is malformed or invalid.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: The requested blog was not found.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error occurred while processing the request.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  router.route('/:id').delete(authorize(), blogController.deleteBlog);



  /**
   * @openapi
   * '/api/v1/blogs/{id}/like':
   *   post:
   *     tags:
   *       - Likes
   *     summary: Like a blog by ID
   *     description: Like a specific blog by specifying its unique ID. This endpoint allows users to like a blog post.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the blog to like.
   *     responses:
   *       200:
   *         description: Successful operation. The blog has been successfully liked.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LikedBlogsResponse'
   *       401:
   *         description: Unauthorized. User not authenticated.
   *       404:
   *         description: The requested blog was not found.
   *       500:
   *         description: Internal server error occurred while processing the request.
   */
  router.post('/:id/like', authorize(), likeCommentController.likeBlog);


  /**
 * @openapi
 * '/api/v1/blogs/{id}/comment':
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a comment to a blog
 *     description: Add a comment to a specific blog by specifying its unique ID. This endpoint allows users to post comments on a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog to comment on.
 *     requestBody:
 *       description: Comment object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentRequest'
 *     responses:
 *       200:
 *         description: Successful operation. The comment has been successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentedBlogResponse'
 *       401:
 *         description: Unauthorized. User not authenticated.
 *       404:
 *         description: The requested blog was not found.
 *       500:
 *         description: Internal server error occurred while processing the request.
 */
  router.post('/:id/comment', authorize(), validateComment, likeCommentController.addComment);

  










  return router;
}

export default blogRouter;



