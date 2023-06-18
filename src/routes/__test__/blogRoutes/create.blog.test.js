import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
// import getCookie from '../../../test/auth.helper';

const blogData = {
    title: 'Test Blog',
    content: 'This is a test blog content.',
    tags: ['test', 'blog'],
};

describe('Create Blog', () => {
    it('should create a new blog and return a 201 status code', async () => {
        const cookie = await getCookie()
        const res = await request(app)
            .post('/api/v1/blogs')
            .set('Cookie', cookie)
            .send(blogData);
          
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Blog created successfully');
        expect(res.body.data.title).toEqual(blogData.title);
        expect(res.body.data.content).toEqual(blogData.content);
    });

    it('should return a 401 status code when unauthorized user access', async () => {
        const res = await request(app)
            .post('/api/v1/blogs')
            .send(blogData);
        expect(res.statusCode).toEqual(401);
        expect(res.body.error.message).toEqual("Unauthorized: User not authenticated");

    });

    it('should return a 422 status code with if any input validation errors', async () => {
        const cookie = await getCookie()

        const blogData = {
            //title missing
            author: 'Author Name',
            tags: ['test', 'blog'],
        };
        const res = await request(app)
            .post('/api/v1/blogs')
            .set('Cookie', cookie)
            .send(blogData);

        expect(res.statusCode).toEqual(422);
        expect(res.body.error.message).toEqual('Validation error');
    });
});
