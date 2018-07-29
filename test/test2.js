var assert = require('assert');
describe('Test suit', function () {
    it('should be ok', function (done) {
        setTimeout(function () {
            assert.equal(0, 0);

            done(); // 비동기 테스트 종료
        }, 1000);
    });
});
