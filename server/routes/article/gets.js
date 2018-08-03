var gets = {};
var response = require("../../utils/response");
var fs = require('fs');

gets.validate = function () {
    return function (req, res, next) {
        next();
    };
};


gets.setParameter = function () {
    return function (req, res, next){

        var filePath = '../../static/crud.txt';
        fs.readFile(filePath, 'utf8', function(err, data) {
            if(err){
                return response.success(res, 400, {data:  data })
            }

            var context = JSON.parse(data);

            req.data = [];
            for(var i=0; i<context.context.length; i++){
                if(context.context[i].body){
                    req.data.push(context.context[i]);
                }
            }

            next();

        });
    }
};

gets.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 200, {data:  req.data })

    };
};


module.exports = gets;
