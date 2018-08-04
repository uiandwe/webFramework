process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /GET route
 */
describe('/GETS article', () => {
    it('it should GETS all the article 1', (done) => {
        chai.request(server)
            .get('/api/article')
            .query({ body: 'Test1' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('Object');
                res.body.should.be.a('object').and.have.property('data');

                var articleArray = res.body.data;

                articleArray.forEach(function(item) {
                    item.should.be.a('object');
                    item.should.have.property('id');
                    item.should.have.property('body');
                });

                done();
            });
    });
});

//잘못된 쿼리 스트링
describe('/GET article', () => {
    it('it should GETS all the article 2', (done) => {
    chai.request(server)
        .get('/api/article')
        .query({ val: 'Test1' })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
});

