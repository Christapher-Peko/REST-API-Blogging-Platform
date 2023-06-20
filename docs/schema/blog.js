/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBlogInput:
 *      type: object
 *      required:
 *        - title
 *        - content
 *      properties:
 *        title:
 *          type: string
 *          default: Example Title
 *        content:
 *          type: string
 *          default: Example Content
 *    CreateBlogResponse:
 *         $ref: '#/components/schemas/BlogPost'
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     LikedBlogsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Blog liked successfully
 *           description: A message indicating the success of liking a blog.
 *         data:
 *           type: object
 *           properties:
 *             likedBlog:
 *               $ref: '#/components/schemas/BlogPost'
 *           description: The details of the liked blog.
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    CommentRequest:
 *      type: object
 *      required:
 *        - comment
 *      properties:
 *        comment:
 *          type: string
 *          default: Good post very interesting
 */



/**
 * @openapi
 * components:
 *   schemas:
 *     CommentedBlogResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Blog Commented successfully
 *           description: A message indicating the success of CommentedBlogResponse a blog.
 *         data:
 *           type: object
 *           properties:
 *             likedBlog:
 *               $ref: '#/components/schemas/BlogPost'
 *           description: The details of the CommentedBlogResponse blog.
 */







/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllBlogsResponse:
 *       type: object
 *       properties:
 *         meta:
 *           $ref: '#/components/schemas/PaginationMeta'
 *         blogs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/BlogPost'
 * 
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 50
 *         page:
 *           type: integer
 *           example: 1
 *         pageSize:
 *           type: integer
 *           example: 10
 *         totalPages:
 *           type: integer
 *           example: 5
 * 
 *     BlogPost:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: abc123
 *         title:
 *           type: string
 *           example: Example Title
 *         content:
 *           type: string
 *           example: Example Content
 *         author:
 *           type: string
 *           example: John Doe
 *         publishedDate:
 *           type: string
 *           example: 2023-06-17
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: [Tag1, Tag2]
 *         featuredImage:
 *           type: string
 *           example: https://example.com/image.jpg
 *         likes:
 *           type: object
 *           properties:
 *               totalLikes:
 *                 type: number
 *                 example: 10
 *         comments:
 *           type: object
 *           properties:
 *               totalComments:
 *                 type: number
 *                 example: 15
 */





/**
 * @openapi
 * components:
 *   schemas:
 *     GetBlogByIdResponse:
 *       $ref: '#/components/schemas/BlogPost'
 */


/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBlogInput:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: Updated Title
 *         content:
 *           type: string
 *           example: Updated Content
 *     UpdateBlogResponse:
 *       $ref: '#/components/schemas/BlogPost'
 */
