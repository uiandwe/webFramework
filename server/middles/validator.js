module.exports = function () {
    return function (aParameterKeys, aEssentialKeys, aResetAvailableKeys) {

        return function (req, res, next) {
            var len = 0;
            var essencialDataCnt = 0;
            var dataCnt = 0;
            var data = {};
            var bSuccess = true;


            for (var i = 0, len = aParameterKeys.length; i < len; ++i) {
                if (data[aParameterKeys[i]]) {
                    essencialDataCnt++;
                }
            }

            // 요청 쿼리의 숫자가 정해진 데이터의 숫자보다 많을 때 (필요없는 쿼리문이 껴잇을경우) 예외처리.
            if (essencialDataCnt < dataCnt) {
                bSuccess = false;
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({
                    code: '400_15'
                }));
            }

            // 필수 파라미터가 없을때 처리.
            for (var i = 0; i < aEssentialKeys.length; ++i) {
                if (!data[aEssentialKeys[i]]) {
                    bSuccess = false;
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                        code: '400_15'
                    }));
                    break;
                }
            }
            if (bSuccess) {
                next();
            }
        }
    }
};