var response = require("../../utils/response");
var post = {};

post.validate = function () {
    return function (req, res, next) {

        next();
    };
};


post.requestMsa = function (){
    return function (req, res, next){
        var body = {
            params : req.body.params
        };

        req.models.test.requestApi(body, function(status, data){
            console.log("requestMsa", status, data);
            if(status == 201){
                next();
            }
            else{
                return response.error(res, status, data);
            }
        })
    }
};


post.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 201, {})
    };
};


module.exports = post;
