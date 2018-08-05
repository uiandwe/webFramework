var get = {};
var response = require("../../utils/response");


get.validate = function (req, res, next) {
    next();
};


get.setParameter = function (req, res, next) {
    next();
};

get.supplement = function (req, res, next) {
    return response.success(res, 200, data);
};


module.exports = get;
