import request from 'supertest';
import { app } from "../app";

const blogData = {
    title: 'Test Blog',
    content: 'This is a test blog content.',
    tags: ['test', 'blog'],
};

async function createBlog() {

    await request(app)
        .post('/api/v1/auth/signup')
        .send({
            user_name: 'Test Name',
            email: 'a@a.com',
            password: 'password',
            confirm_password: 'password'
        })
        .expect(201)
    const authResponse = await request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'a@a.com',
            password: 'password',
        })
        .expect(200)

    const cookie = authResponse.get('Set-Cookie');

    const res = await request(app)
        .post('/api/v1/blogs')
        .set('Cookie', cookie)
        .send(blogData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Blog created successfully');
    expect(res.body.data.title).toEqual(blogData.title);
    expect(res.body.data.content).toEqual(blogData.content);

    return res.body.data._id;
};

async function createBlogAndCookie() {

    await request(app)
        .post('/api/v1/auth/signup')
        .send({
            user_name: 'Test Name',
            email: 'a@a.com',
            password: 'password',
            confirm_password: 'password'
        })
        .expect(201)
    const authResponse = await request(app)
        .post('/api/v1/auth/signin')
        .send({
            email: 'a@a.com',
            password: 'password',
        })
        .expect(200)

    const cookie =  authResponse.get('Set-Cookie');

    const res = await request(app)
        .post('/api/v1/blogs')
        .set('Cookie', cookie)
        .send(blogData);
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Blog created successfully');
    expect(res.body.data.title).toEqual(blogData.title);
    expect(res.body.data.content).toEqual(blogData.content);

    return { blogId: res.body.data._id,cookie };
};

export { createBlog, createBlogAndCookie }


