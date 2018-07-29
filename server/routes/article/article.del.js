var del = {};

del.validate = function () {
    return function (req, res, next) {
        console.log(req.params.id);
        next();

    };
};


del.setParameter = function () {
    return function (req, res, next){

        var fs = require('fs');
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

del.supplement = function () {
    return function (req, res, next) {

        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({data:  '' }));

    };
};


module.exports = del;
