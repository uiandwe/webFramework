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
    it('it should GETS all the article', (done) => {
        chai.request(server)
            .get('/api/article')
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


describe('/GET article', () => {
    it('it should GET all the article', (done) => {
    chai.request(server)
        .get('/api/article/-1')
        .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('Object');
            res.body.should.be.a('object').and.have.property('data');

            var article = res.body.data;
            article.should.equal("데이터 없음");

            done();
        });
    });
});

