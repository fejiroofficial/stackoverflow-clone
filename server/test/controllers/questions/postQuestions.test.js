import chai, { expect } from 'chai';
import User from '../../../models/user';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../../../app';

chai.use(chaiHttp);


const myUrl = '/api/v1';

describe('Post question', () => {
    let token = '';
    before(async () => {
        let authpayload = await chai.request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'oke@gmail.com', password: '123456' });
        token = authpayload.body.data.token;
    });
    const newQuestion = {
        title: '403 forbidden',
        description: 'I am getting this error all the time',
    };

    it('should throw an error if title is not provided', (done) => {
        const blankTitle = { ...newQuestion };
        delete blankTitle.title;

        chai
            .request(app)
            .post(`${myUrl}/questions`)
            .set('Authorization', token)
            .send(blankTitle)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                expect(res.body.error[0]).to.equal('The title of your question cannot be empty');
                done();
            });
    });

    it('should throw an error if description is not provided', (done) => {
        const blankTitle = { ...newQuestion };
        delete blankTitle.description;

        chai
            .request(app)
            .post(`${myUrl}/questions`)
            .set('Authorization', token)
            .send(blankTitle)
            .end((err, res) => {
                expect(res.status).to.equal(422);
                expect(res.body.error[0]).to.equal('The description of your question is required but none provided');
                done();
            });
    });


    it('should return successful if question is posted', (done) => {
        const question = { ...newQuestion };
        chai
            .request(app)
            .post(`${myUrl}/questions`)
            .set('Authorization', token)
            .send(question)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Question has been posted on the channel');
                done();
            });
    });

});