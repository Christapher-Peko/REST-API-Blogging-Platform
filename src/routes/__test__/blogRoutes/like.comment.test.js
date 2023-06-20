import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
import { createBlogAndCookie } from '../../../test/bloag.helper';

describe('Like a Blog by ID', () => {
    let blogId;
    let cookie;

    beforeEach(async () => {
        // Create a blog and cookie of the user
        const { blogId: createdBlogId, cookie: createdCookie } = await createBlogAndCookie();
        blogId = createdBlogId;
        cookie = createdCookie;
    });
    

    it('should like a blog and return a 200 status code', async () => {
        const res = await request(app)
            .post(`/api/v1/blogs/${blogId}/like`)
            .set('Cookie', cookie);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Blog liked successfully');
        //expect(res.body.data.likes).toEqual(1);
    });

    it('should return a 401 status code when an unauthorized user tries to like a blog', async () => {
        const res = await request(app)
            .post(`/api/v1/blogs/${blogId}/like`);

        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual('Unauthorized: User not authenticated');
    });

    it('should return a 404 status code when trying to like a non-existing blog', async () => {
        const invalidBlogId = '123456789123';
        const res = await request(app)
            .post(`/api/v1/blogs/${invalidBlogId}/like`)
            .set('Cookie', cookie);

        expect(res.statusCode).toEqual(404);
        expect(res.body.error.message).toEqual('Blog not found');
    });

    it('should return a 409 status code when liking a blog that is already liked by the user', async () => {
        const resp = await request(app)
            .post(`/api/v1/blogs/${blogId}/like`)
            .set('Cookie', cookie);

        const res = await request(app)
            .post(`/api/v1/blogs/${blogId}/like`)
            .set('Cookie', cookie)

        expect(res.statusCode).toEqual(409);
        expect(res.body.error.message).toEqual('User has already liked the blog');
    });

});



//validate comment 422 Validation error


describe('Comment on a Blog by ID', () => {
    let blogId;
    let cookie;

    beforeEach(async () => {
        // Create a blog and cookie of the user
        const { blogId: createdBlogId, cookie: createdCookie } = await createBlogAndCookie();
        blogId = createdBlogId;
        cookie = createdCookie;
    });
    
    it('should comment on a blog and return a 200 status code', async () => {
        const commentData = {
            comment: 'This is a test comment.',
        };

        const res = await request(app)
            .post(`/api/v1/blogs/${blogId}/comment`)
            .set('Cookie', cookie)
            .send(commentData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Blog Commented successfully');
        //expect(res.body.data.comments).toHaveLength(1);
    });

    it('should return a 401 status code when an unauthorized user tries to comment on a blog', async () => {
        const commentData = {
            comment: 'This is a test comment.',
        };

        const res = await request(app)
            .post(`/api/v1/blogs/${blogId}/comment`)
            .send(commentData);

        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual('Unauthorized: User not authenticated');
    });

    it('should return a 400 status code when trying to comment on a non-existing blog', async () => {
        const invalidBlogId = '1234567w89123';
        const commentData = {
            comment: 'This is a test comment.',
        };

        const res = await request(app)
            .post(`/api/v1/blogs/${invalidBlogId}/comment`)
            .set('Cookie', cookie)
            .send(commentData);

            console.log(res);

        expect(res.statusCode).toEqual(400);
        expect(res.body.error.message).toEqual('Invalid blog ID');
    });
    
});
