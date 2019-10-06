import chai, { expect, request } from 'chai';
import chaiHTTP from 'chai-http';

import app from '../../../app';

chai.use(chaiHTTP);

describe('User login', () => {
  it('if email is not provided', (done) => {
    let user = {
    id: 1,
    firstname: "Oke",
    lastname: "Gospel",
    email: "",
    password: "123456",
    createdAt: "2018-09-02T19:49:33.273Z",
    updatedAt: "2018-09-02T19:49:33.273Z"
  }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error[0]).to.equal(
            'Email is required but none provided.');
        done();
      });
  });
  it('if password is not provided', (done) => {
    let user = {
      id: 1,
      firstname: "Oke",
      lastname: "Gospel",
      email: "oke3@gmail.com",
      password: "",
      createdAt: "2018-09-02T19:49:33.273Z",
      updatedAt: "2018-09-02T19:49:33.273Z"
    }
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.error[0]).to.equal('User password must be provided.');
        done();
      })
  })

  it('should not signin if email does not exist in db', (done) => {
    let user = {
      id: 1,
      firstname: 'Oke',
      lastname: 'Gospel',
      email: 'oke3@gmail.com',
      password: '123456',
      createdAt: '2018-09-02T19:49:33.273Z',
      updatedAt: '2018-09-02T19:49:33.273Z'
    }
    const invalidEmail = { ...user, email: 'emaildoesnotexist@mail.com' };
    request(app)
      .post('/api/v1/auth/login')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Incorrect Email or password');
        done();
      });
  });
  it('should not signin user if password is incorrect', (done) => {
    let user = {
      id: 1,
      firstname: 'Okeoghene',
      lastname: 'Gospel',
      email: 'oke@gmail.com',
      password: '123456',
      createdAt: '2018-09-02T19:49:33.273Z',
      updatedAt: '2018-09-02T19:49:33.273Z'
    }
    const wrongPassword = { ...user, password: 'wrongpassword' };
    request(app)
      .post('/api/v1/auth/login')
      .send(wrongPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Incorrect Email or password');
        done();
      });
  });
  it('should return a successful message after login', (done) => {
    request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'oke@gmail.com', password: '123456' })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Login was successful');
        done();
      });
  });
})