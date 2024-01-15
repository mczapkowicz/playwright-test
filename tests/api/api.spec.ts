import { test, expect } from '@playwright/test';

test.describe.parallel('Simple API testing', () => {
  const baseUrl = 'https://reqres.in/api';

  test('Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`);
    expect(response.status()).toBe(200);
  });

  test('Assert non existing endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing`);
    expect(response.status()).toBe(404);
  });

  test('GET - user details', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2`);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.first_name).toBe('Janet');
    expect(responseBody.data.last_name).toBe('Weaver');
    expect(responseBody.data.email).toBeTruthy();
  });

  test('POST - create new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/users`, {
      data: {
        name: 'John',
        job: 'worker',
      },
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('John');
    expect(responseBody.job).toBe('worker');
    expect(responseBody.createdAt).toBeTruthy();
  });

  test('POST - login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.token).toBeTruthy();
  });

  test('POST - login fail', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: null,
      },
    });
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.error).toBe('Missing password');
  });

  test('PUT - update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'Al',
        job: 'shoes salesman',
      },
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Al');
    expect(responseBody.job).toBe('shoes salesman');
    expect(responseBody.updatedAt).toBeTruthy();
  });

  test('DELETE - delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`);
    expect(response.status()).toBe(204);
  });
});
