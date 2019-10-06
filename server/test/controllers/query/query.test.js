import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

describe('Full Text search', () => {
  it('should return an array of data', (done) => {
    chai
      .request(app)
      .get('/api/v1/search?question=lala')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return error if multiple parameters', (done) => {
    chai
      .request(app)
      .get('/api/v1/search?question=lala&answer=lala')
      .end((err, res) => {
        expect(res.status).to.equal(422);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Too many search parameters');
        done();
      });
  });
});
