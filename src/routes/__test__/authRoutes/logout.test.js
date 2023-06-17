import request from 'supertest';
import { app } from '../../../app';


describe('Sign out', () => {
    it('should return a 200 after successful sign out', async () => {
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                user_name: 'Test Name',
                email: 'a@a.com',
                password: 'password',
                confirm_password: 'password'
            })
        await request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'a@a.com',
                password: 'password',
            })
        const response = await request(app)
            .post('/api/v1/auth/logout')
            .send({})
            .expect(200);
        expect(response.get('Set-Cookie')[0]).toEqual(
            'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
        );

    });

})