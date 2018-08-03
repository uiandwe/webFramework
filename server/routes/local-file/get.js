var get = {};
var response = require("../../utils/response");


get.validate = function () {
    return function (req, res, next) {

        req.models.test.findById(req.params.id, function(status, data){
            if(status == 200){
                var testData = data;
                req.data = data;
                console.log("pass?");
                next();
            }
            else{
                return response.error(res, status, data);
            }

        });
    };
};


get.setParameter = function () {
    return function (req, res, next){
        // var filePath = './static/crud.txt';
        //
        // var fs = require('fs')
        // fs.readFile(filePath, 'utf8', function(err, data) {
        //
        //     var context = JSON.parse(data);
        //
        //     var exist = false;
        //
        //     for(var i=0; i<context.context.length; i++){
        //         if(context.context[i].id == req.params.id){
        //             req.data = context.context[i];
        //
        //             exist = true;
        //             next();
        //         }
        //     }
        //
        //     if(exist == false){
        //         res.set('cache-control', 'no-cache, no-store, must-revalidate');
        //         res.set('pragma',  'no-cache');
        //         res.set('expires', 0);
        //         res.statusCode = 404;
        //         res.setHeader('Content-Type', 'application/json');
        //
        //         return res.end(JSON.stringify({data:  '데이터 없음' }));
        //     }
        //
        // });
        next();
    }
};

get.supplement = function () {
    return function (req, res, next) {
        return response.success(res, data);

    };
};


module.exports = get;
