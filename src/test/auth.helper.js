import request from 'supertest';
import { app } from "../app";



async function getCookie() {

    await request(app)
        .post('/api/v1/auth/signup')
        .send({
            user_name: 'Test Name',
            email: 'a@b.com',
            password: 'password',
            confirm_password: 'password'
        })
        .expect(201);
    const authResponse = await request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'a@b.com',
            password: 'password',
        })
        .expect(200)

     const cookie = authResponse.get('Set-Cookie');

    return cookie;
};

export default getCookie


