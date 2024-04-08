import * as request from 'supertest';
import { CreateUserDto } from '../src/dto/create-user.dto';

describe('All endpoints (e2e)', () => {
  const baseUrl = 'http://localhost:3000/api/v1';
  const newUserUsername = 'test' + new Date().getTime();
  const payload: CreateUserDto = {
    username: newUserUsername,
    password: 'test',
  };
  let jwtToken: string;

  describe('/register (POST)', () => {
    const url = '/register';
    it('should register a new user', () => {
      return request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send(payload)
        .expect((response: request.Response) => {
          const { message } = response.body;
          expect(message).toBe('User registered successfully');
        })
        .expect(201);
    });
    it('should not register a new user with the same username', () => {
      return request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send(payload)
        .expect((response: request.Response) => {
          const { message } = response.body;
          expect(message).toBe('Username already exists');
        })
        .expect(409);
    });
    it('should not register a new user without a username', () => {
      return request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send({ password: 'test' })
        .expect(400);
    });
    it('should not register a new user without a password', () => {
      return request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send({ username: 'test' })
        .expect(400);
    });
  });

  describe('/login (POST)', () => {
    const url = '/login';
    it('should login a user', () => {
      const response = request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send(payload)
        .expect(200);
      return response.then((res) => {
        const token = res.body.access_token;
        jwtToken = token;
        expect(token).toBeDefined();
      });
    });
    it('should not login a user with an incorrect password', () => {
      return request(baseUrl)
        .post(url)
        .set('Accept', 'application/json')
        .send({ username: newUserUsername, password: 'wrong' })
        .expect(401);
    });
  });

  describe('/protected (GET)', () => {
    const url = '/protected';
    it('should not access the protected route without a token', () => {
      return request(baseUrl)
        .get(url)
        .set('Accept', 'application/json')
        .expect(401);
    });
    it('should not access the protected route with an invalid token', () => {
      return request(baseUrl)
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer invalid`)
        .expect(401);
    });
    it('should access the protected route with a token', () => {
      return request(baseUrl)
        .get(url)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect((response: request.Response) => {
          const { message } = response.body;
          expect(message).toBe('Access granted');
        })
        .expect(200);
    });
  });
});
