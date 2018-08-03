var put = {};
var response = require('../../utils/response');

put.validate = function () {
    return function (req, res, next) {
        next();
    };
};


put.getTest = function (){
    return function (req, res, next){
        console.log("req.params.id", req.params.id);
        req.models.test.findById(req.params.id, function(status, data){
           if(status == 200){
               req.data = data;
               next();
           }
            else{
                return response.error(res, status, data);
           }
        });
    }
};

put.setParameter = function () {
    return function (req, res, next){

        req.data.update({body: req.body.body}).then(function() {
            req.data.increment({
                "userId": 1
            }).then(function(){
                return req.data.reload();
            }).then(function(){
                next();
            });
        }).catch(function(err) {
            return response.error(res, status, error);
        });
    }
};

put.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 204, req.data)
    };
};


module.exports = put;
