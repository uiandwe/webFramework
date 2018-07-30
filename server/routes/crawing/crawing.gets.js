var gets = {};
var response = require("../../utils/response");

gets.validate = function () {
    return function (req, res, next) {
        next();
    };
};


gets.setParameter = function () {
    return function (req, res, next){
        var query = {
            where : {},
            include : [{
                "model": req.models.collection_item
            }]
        };


        req.models.collection_page.findAllDataWithQuery(query, function (status, data) {
            if(status == 200){
                console.log(data);
                next();
            }
            else{
                return response.error(res, status, data);
            }
        });

    }
};

gets.supplement = function () {
    return function (req, res, next) {
        return response.success(res, 200, {data:  req.data })

    };
};


module.exports = gets;
