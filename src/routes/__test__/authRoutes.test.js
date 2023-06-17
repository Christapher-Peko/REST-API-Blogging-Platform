import request from 'supertest';
import { app } from '../../app.js';

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

describe('User Signin', () => {
    it('should return a 200  & sets a cookie after successful sign in', async () => {
        await request(app)
            .post('/api/v1/auth/signup')
            .send({
                user_name: 'Test Name',
                email: 'a@a.com',
                password: 'password',
                confirm_password: 'password'
            })
        const response = await request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'a@a.com',
                password: 'password',
            })
            .expect(200);
        expect(response.get('Set-Cookie')).toBeDefined();
    });
    it('should return a 404 status code when a email that does not exist is supplied', async () => {
        await request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'a@a.com',
                password: 'password'
            })
            .expect(404);
    });

    it('should return a 400 status code with invalid credentials', async () => {
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
                password: 'incorrectpassword'
            })
            .expect(400);
    });
})

