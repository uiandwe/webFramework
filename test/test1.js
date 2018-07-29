var assert = require('assert');
describe('suite1', () => {
    before('before1', () => console.log('before1')); // 1
    beforeEach('beforeEach1', () => console.log('beforeEach1')); // 3, 5

    describe('suite2', () => {
        before('before2', () => console.log('before2')); // 2
        beforeEach('beforeEach2', () => console.log('beforeEach2')); // 4, 6

        it('test1', () => console.log('test1'))
        it('test2', () => console.log('test2'));
    });
});
