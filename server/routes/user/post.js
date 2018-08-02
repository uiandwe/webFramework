var response = require("../../utils/response");
var post = {};

post.validate = function () {
    return function (req, res, next) {
        next();
    };
};


post.createUser = function (){
    return function (req, res, next){
        var body = {
            salt: '123qwe',
            name: 'test'
        };

        req.models.user.createUser(body, function(status, data){
            console.log(status, data);
            next();
        });
    }
};


post.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 201, {})
    };
};


module.exports = post;
