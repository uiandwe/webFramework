var response = require("../../utils/response");
var post = {};

post.validate = function (req, res, next) {
    next();
};


post.requestMsa = function (req, res, next){
    next();
};


post.supplement = function (req, res, next) {
    return response.success(res, 201, {})
};


module.exports = post;
