var put = {};

put.validate = function () {
    return function (req, res, next) {
        next();
    };
};


put.getTest = function (){
    return function (req, res, next){
        console.log("req.params.id", req.params.id);
        // req.models.test.findById(req.params.id, function(status, data){
        //    if(status == 200){
        //        req.data = data;
        //        next();
        //    }
        //     else{
        //     console.log(status);
        //        console.log(data);
        //    }
        // }) ;
        next();
    }
};

put.setParameter = function () {
    return function (req, res, next){
        // req.data.update({body: req.body.body}).then(function() {
        //
        //     req.data.increment({
        //         "userId": 1
        //     }).then(function(){
        //         return req.data.reload();
        //     }).then(function(){
        //         next();
        //     });
        // }).catch(function(err) {
        //     //TODO: error handling
        //     console.log(err);
        // });

        var fs = require('fs');
        var filePath = './static/crud.txt';
        fs.readFile(filePath, 'utf8', function(err, data) {

            var context = JSON.parse(data);

            var exist = false;

            for(var i=0; i<context.context.length; i++){
                if(context.context[i].id == req.params.id){
                    context.context[i].body = req.body.body;

                    fs.writeFile(filePath, JSON.stringify(context), function (err) {
                        if (err) throw err;
                        next();
                    });

                    exist = true;

                }
            }

            if(exist == false){
                res.set('cache-control', 'no-cache, no-store, must-revalidate');
                res.set('pragma',  'no-cache');
                res.set('expires', 0);
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');

                return res.end(JSON.stringify({data:  '데이터 없음' }));
            }

        });


    }
};

put.supplement = function () {
    return function (req, res, next) {

        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({ 'data': ''}));

    };
};


module.exports = put;
