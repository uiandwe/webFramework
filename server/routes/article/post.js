var post = {};
var response = require("../../utils/response");

post.validate = function () {
    return function (req, res, next) {
        next();

    };
};


post.setParameter = function () {
    return function (req, res, next){
        var body = req.body;
        req.models.test.create(body).then(function(result) {
            req.data = result;
            next();
        }).catch(function(err) {
            return response.error(res, 500, json.parse(err));
        });

    }
};

post.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 201, req.data);
    };
};


module.exports = post;
