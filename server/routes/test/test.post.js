var response = require("../../utils/response");
var post = {};

post.validate = function () {
    return function (req, res, next) {

        next();
    };
};


post.requestMsa = function (){
    return function (req, res, next){
        next();
    }
};


post.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 201, {})
    };
};


module.exports = post;
