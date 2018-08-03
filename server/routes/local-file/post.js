var post = {};

post.validate = function () {
    return function (req, res, next) {
        // console.log(req.params.id);
        next();

    };
};


post.setParameter = function () {
    return function (req, res, next){
        
        // var fs = require('fs');
        //
        // var filePath = './static/crud.txt';
        // fs.readFile(filePath, 'utf8', function(err, data) {
        //
        //     var context = JSON.parse(data);
        //
        //
        //     var fileWriteObj = {
        //         id: context.context.length,
        //         body: req.body.body
        //     };
        //     context.context.push(fileWriteObj);
        //
        //     fs.writeFile(filePath, JSON.stringify(context), function (err) {
        //         if (err) throw err;
        //         console.log('Saved!');
        //         req.data = fileWriteObj;
        //         next();
        //     });
        // });

    }
};

post.supplement = function () {
    return function (req, res, next) {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = post;
