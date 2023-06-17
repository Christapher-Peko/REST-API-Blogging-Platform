import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
import createBlog from '../../../test/bloag.helper';
// import getCookie from '../../../test/auth.helper';


describe('Get a Blog by ID', () => {
    it('should return a blog and a 200 status code', async () => {
        // Create a blog
        const blogId = await createBlog();

        const res = await request(app)
            .get(`/api/v1/blogs/${blogId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Blog retrieved successfully');
        expect(res.body.data._id).toEqual(blogId);
    });

    it('should return a 404 status code when blog ID does not exist', async () => {
        //non-existing blog ID
        const blogId = '123456789123';

        const res = await request(app)
            .get(`/api/v1/blogs/${blogId}`);

        expect(res.statusCode).toEqual(404);
        expect(res.body.error.message).toEqual('Blog not found');
    });

    it('should return a 400 status code when blog ID is invalid mongo obj id', async () => {
        // invalid/non-existing blog ID
        const blogId = "445645464";

        const res = await request(app)
            .get(`/api/v1/blogs/${blogId}`);

        expect(res.statusCode).toEqual(500);
        expect(res.body.error.message).toEqual('Cast to ObjectId failed for value "445645464" (type string) at path "_id" for model "BlogPost"');
    });

});
