import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

chai.use(chaiHttp);

describe("app test", () => {
    it("has a module called app", (done) => {
        expect(app).to.be.ok;
        done();
    });
  
    it("should respond with a welcome message", (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.success).to.equal("true");
                expect(res.type).to.equal("application/json");
                expect(res.body).to.be.an("object");
                expect(res.body.message).to.equal("Welcome to stackoverflow-clone");
                done();
        });
    });
});
