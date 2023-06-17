/**
 * @openapi
 * components:
 *  schemas:
 *    CreateBlogInput:
 *      type: object
 *      required:
 *        - title
 *        - content
 *        - author
 *      properties:
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        author:
 *          type: string
 *    CreateBlogResponse:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        content:
 *          type: string
 *        author:
 *          type: string
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
