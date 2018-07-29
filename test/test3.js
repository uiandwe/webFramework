var assert = require('assert');
describe('Test suit', function () {

    // 이 테스트 suite을 5초 내로 수행함
    this.timeout(5000);

    it('should be ok', function (done) {
        setTimeout(function () {
            // 3초후 비동기 코드가 실행됨
            assert.equal(0, 0);
            done();
        }, 3000);
    });
});
