process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

//필수 파라미터 포함 
describe('/POST test', () => {
    it('it should test post success', (done) => {
        chai.request(server)
            .post('/api/test')
            .send({params: 'test'})
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});


//파라미터가 없을시 에러
describe('/POST test', () => {
    it('it should test post fail', (done) => {
        chai.request(server)
            .post('/api/test')
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});
