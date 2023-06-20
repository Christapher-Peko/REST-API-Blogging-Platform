import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
import { createBlogAndCookie } from '../../../test/bloag.helper';

describe('Update Blog by ID', () => {
  let blogId;
  let cookie;

  beforeEach(async () => {
    // Create a blog and cookie of the user
    const { blogId: createdBlogId, cookie: createdCookie } = await createBlogAndCookie();
    blogId = createdBlogId;
    cookie = createdCookie;
  });

  it('should update a blog and return a 200 status code', async () => {
    const updatedTitle = 'Updated Title';
    const updatedContent = 'Updated content';

    const res = await request(app)
      .put(`/api/v1/blogs/${blogId}`)
      .set('Cookie', cookie)
      .send({ title: updatedTitle, content: updatedContent });


    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Blog updated successfully');
    expect(res.body.data.title).toEqual(updatedTitle);
    expect(res.body.data.content).toEqual(updatedContent);
  });

  it('should return a 401 status code when an unauthorized user tries to update a blog', async () => {
    const res = await request(app)
      .put(`/api/v1/blogs/${blogId}`)
      .send({ title: 'Updated Title', content: 'Updated content' });

    expect(res.statusCode).toEqual(401);
    expect(res.body.error.message).toEqual('Unauthorized: User not authenticated');
  });

  it('should return a 403 status code when a user tries to update another user\'s blog', async () => {
    const anotherCookie = await getCookie(); // Cookie of another user
    const res = await request(app)
      .put(`/api/v1/blogs/${blogId}`)
      .set('Cookie', anotherCookie)
      .send({ title: 'Updated Title', content: 'Updated content' });

    expect(res.statusCode).toEqual(403);
    expect(res.body.error.message).toEqual('You are not authorized to edit this blog');
  });

  it('should return a 404 status code when trying to update a non-existing blog', async () => {
    const invalidBlogId = '123456789123';
    const res = await request(app)
      .put(`/api/v1/blogs/${invalidBlogId}`)
      .set('Cookie', cookie)
      .send({ title: 'Updated Title', content: 'Updated content' });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('Blog not found..');
  });
});
