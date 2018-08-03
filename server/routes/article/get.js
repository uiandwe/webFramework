var get = {};
var response = require("../../utils/response");


get.validate = function () {
    return function (req, res, next) {

        req.models.test.findById(req.params.id, function(status, data){
            if(status == 200){
                var testData = data;
                req.data = data;
                next();
            }
            else{
                return response.error(res, status, data);
            }

        });
    };
};


get.setParameter = function () {
    return function (req, res, next){
        next();
    }
};

get.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 200, data);

    };
};


module.exports = get;
