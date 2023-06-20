import request from 'supertest';
import { app } from '../../../app';
import getCookie from '../../../test/auth.helper';
import { createBlog, createBlogAndCookie } from '../../../test/bloag.helper';

describe('Delete Blog by ID', () => {
  let blogId;
  let cookie;

  beforeEach(async () => {
    // Create a blog and cookie of the user
    const { blogId: createdBlogId, cookie: createdCookie } = await createBlogAndCookie();
    blogId = createdBlogId;
    cookie = createdCookie;
  });

  

  it('should delete a blog and return a 200 status code', async () => {
    
    const res = await request(app)
      .delete(`/api/v1/blogs/${blogId}`)
      .set('Cookie', cookie);
      console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Blog deleted successfully');
  });



  it('should return a 403 status code when a user tries to delete another users blog', async () => {
    const anotherCookie = await getCookie(); // Cookie of another user
    const res = await request(app)
      .delete(`/api/v1/blogs/${blogId}`)
      .set('Cookie', anotherCookie);

    expect(res.statusCode).toEqual(403);
    expect(res.body.error.message).toEqual('You are not authorized to delete this blog');
  });



  it('should return a 401 status code when an unauthorized user tries to delete a blog', async () => {
    const res = await request(app)
      .delete(`/api/v1/blogs/${blogId}`);

    expect(res.statusCode).toEqual(401);
    expect(res.body.error.message).toEqual('Unauthorized: User not authenticated');
  });



  it('should return a 404 status code when trying to delete a non-existing blog', async () => {
    const invalidBlogId = '123456789123';
    const res = await request(app)
      .delete(`/api/v1/blogs/${invalidBlogId}`)
      .set('Cookie', cookie);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error.message).toEqual('Blog not found');
  });
  
});
