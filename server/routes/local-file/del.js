var del = {};
var fs = require('fs');

del.validate = function (req, res, next) {
    console.log(req.params.id);
    next();
};


del.setParameter = function (req, res, next) {

    var filePath = './static/crud.txt';
    fs.readFile(filePath, 'utf8', function(err, data) {

        var context = JSON.parse(data);

        var exist = false;

        for(var i=0; i<context.context.length; i++){
            if(context.context[i].id == req.params.id){

                context.context.splice(i, 1);
                fs.writeFile(filePath, JSON.stringify(context), function (err) {
                    if (err) throw err;
                    next();
                });

                exist = true;

            }
        }

        if(exist == false){
            return response.error(res, 404, {data:  '데이터 없음' });
        }

    });
};

del.supplement = function (req, res, next) {
    return response.success(res, 201, {data:  '' });
};


module.exports = del;
