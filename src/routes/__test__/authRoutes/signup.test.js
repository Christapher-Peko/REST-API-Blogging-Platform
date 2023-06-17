import request from 'supertest';
import { app } from '../../../app';


describe('User Signup', () => {
    it('should return a 201 status code on successful user signup', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                user_name: 'Test Name',
                email: 'a@a.com',
                password: 'password',
                confirm_password: 'password'
            })
            .expect(201);
    });

    it('should return a 422 status code with invalid input validation errors', async () => {
        const response = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: 'alskdflaskjfd',
                password: 'password',
                confirm_password: 'password'
            })
            .expect(422);
    });
    it('should return a 409 status if duplicate emails', async () => {
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                user_name: 'Test Name',
                email: 'a@a.com',
                password: 'password',
                confirm_password: 'password'
            })
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                user_name: 'Test Name',
                email: 'a@a.com',
                password: 'password',
                confirm_password: 'password'
            })
            .expect(409);
    });
});
