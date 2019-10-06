import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../app';

chai.use(chaiHttp);

describe('Subscribe to questions', () => {
    let token = '';
    let questionId = '';
    before(async () => {
        let authpayload = await chai.request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'oke@gmail.com', password: '123456' });
        token = authpayload.body.data.token;
        let question = await chai.request(app)
            .post('/api/v1/questions')
            .set('Authorization', token)
            .send({ title: 'jjjjd', description: 'jfjfj'});
        questionId = question.body.data._id;
    });

    it('should return error with wrong parameter', (done) => {
        chai
            .request(app)
            .post('/api/v1/questions/5d99a0d4f07a809e/subscribe')
            .set('Authorization', token)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                expect(res.body.error).to.equal('Id parameter must be a single String of 12 bytes or a string of 24 hex characters');
                done();
            });
    });

    it('should return error if question does not exist', (done) => {
        chai
            .request(app)
            .post('/api/v1/questions/5d99a74f0d4fb545f07a809e/subscribe')
            .set('Authorization', token)
            .send({ vote: true })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('This Question does not exist');
                done();
            });
    });

    it('should return success if question exist', (done) => {
        chai
            .request(app)
            .post(`/api/v1/questions/${questionId}/subscribe`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('You have subscribed to receiving notification for this question');
                done();
            });
    });

    it('should unsubscribe', (done) => {
        chai
            .request(app)
            .post(`/api/v1/questions/${questionId}/subscribe`)
            .set('Authorization', token)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('You have unsubscribed to receiving notification for this question');
                done();
            });
    });
});
