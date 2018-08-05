var put = {};

put.validate = function (req, res, next) {
    next();
};


put.getTest = function (req, res, next){
    next();
};

put.setParameter = function (req, res, next) {
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
            return response.error(res, 404, {data:  req.data });
        }

    });
};

put.supplement = function (req, res, next) {
    return response.success(res, 201, {data:  req.data });
};


module.exports = put;
