// import { jest } from '@jest/globals';
import request from 'supertest';

import pool from '';
import setup from '';
import app from '';
import Order from '';

describe('service routes', () => {
  beforeEach(async () => {
    return setup(pool);
  });

  test('creates a new order in our database and send a text message notification', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 });

    expect(res.body).toEqual({ id: '1', quantity: 10 });
  });
});
