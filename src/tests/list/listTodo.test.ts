import request from 'supertest';
import { app } from '../../server';

describe('GET/todos', () => {
  it('Should return a list of todos', async () => {
    const res = await request(app).get('/todos');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
