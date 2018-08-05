var get = {};
var response = require("../../utils/response");


get.validate = function (req, res, next) {
    req.models.test.findById(req.params.id, function(status, data){
        if(status == 200){
            req.data = data;
            next();
        }
        else{
            return response.error(res, status, data);
        }

    });
};


get.setParameter = function (req, res, next) {
    next();
};

get.supplement = function (req, res, next) {
    return response.success(res, 200, {data:  req.data });
};


module.exports = get;
