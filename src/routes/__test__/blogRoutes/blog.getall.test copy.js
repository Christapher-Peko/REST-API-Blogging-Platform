import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
// import getCookie from '../../../test/auth.helper';


describe('Get All Blogs', () => {
    it('should return all blogs and a 200 status code', async () => {
        const res = await request(app)
            .get('/api/v1/blogs');

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Blogs retrieved successfully');
    });
});
