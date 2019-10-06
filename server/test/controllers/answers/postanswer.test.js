import chai, { expect } from 'chai';
import User from '../../../models/user';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../../app';

chai.use(chaiHttp);


const myUrl = '/api/v1';

describe('Post answer', () => {
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
    })

    const newAnswer = {
        answer: 'A new answer right here',
    };

    it('should return error with wrong parameter', (done) => {
        chai
            .request(app)
            .post('/api/v1/questions/5d99a0d4f07a809e/answers')
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
            .post('/api/v1/questions/5d99a74f0d4fb545f07a809e/answers')
            .set('Authorization', token)
            .send({ ...newAnswer })
            .end((err, res) => {
                expect(res.status).to.equal(404);
                expect(res.body.success).to.equal(false);
                expect(res.body.message).to.equal('This Question does not exist');
                done();
            });
    });

    it('should throw an error if answer is not provided', (done) => {
        const blankAnswer = { ...newAnswer };
        delete blankAnswer.answer;

        chai
            .request(app)
            .post(`${myUrl}/questions/${questionId}/answers`)
            .set('Authorization', token)
            .send(blankAnswer)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                expect(res.body.error[0]).to.equal('Please provide an answer to this question');
                done();
            });
    });

    it('should return successful if question is posted', (done) => {
        chai
            .request(app)
            .post(`${myUrl}/questions/${questionId}/answers`)
            .set('Authorization', token)
            .send({ ...newAnswer })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Your answer has been posted successfully');
                done();
            });
    });

});