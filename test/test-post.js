process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

describe('/POST test', () => {
    it('it should psot all the test', (done) => {
        chai.request(server)
            .post('/api/test')
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

