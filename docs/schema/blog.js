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
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          example: abc123
 *        title:
 *          type: string
 *          example: Example Title
 *        content:
 *          type: string
 *          example: Example Content
 *        author:
 *          type: string
 *          example: John Doe
 *        publishedDate:
 *          type: string
 *        tags:
 *          type: array
 *          items:
 *            type: string
 *        featuredImage:
 *          type: string
 *        likes:
 *          type: number
 *        comments:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              author:
 *                type: string
 *              content:
 *                type: string
 *              timestamp:
 *                type: string
 */




/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllBlogsResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/BlogPost'
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
 *           type: number
 *           example: 10
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *                 example: Jane Smith
 *               content:
 *                 type: string
 *                 example: This is a comment.
 *               timestamp:
 *                 type: string
 *                 example: 2023-06-17T10:30:00Z
 */




/**
 * @openapi
 * components:
 *   schemas:
 *     GetBlogByIdResponse:
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
 *           type: number
 *           example: 10
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *                 example: Jane Smith
 *               content:
 *                 type: string
 *                 example: This is a comment.
 *               timestamp:
 *                 type: string
 *                 example: 2023-06-17T10:30:00Z
 */



/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBlogInput:
 *       type: object
 *      required:
 *        - title
 *        - content
 *       properties:
 *         title:
 *           type: string
 *           example: Updated Title
 *         content:
 *           type: string
 *           example: Updated Content
 *     UpdateBlogResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: abc123
 *         title:
 *           type: string
 *           example: Updated Title
 *         content:
 *           type: string
 *           example: Updated Content
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
 *           type: number
 *           example: 10
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *                 example: Jane Smith
 *               content:
 *                 type: string
 *                 example: This is a comment.
 *               timestamp:
 *                 type: string
 *                 example: 2023-06-17T10:30:00Z
 */
