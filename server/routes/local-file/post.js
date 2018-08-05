var post = {};

post.validate = function (req, res, next) {
    next();
};


post.setParameter = function (req, res, next) {
    var fs = require('fs');

    var filePath = './static/crud.txt';
    fs.readFile(filePath, 'utf8', function(err, data) {

        var context = JSON.parse(data);


        var fileWriteObj = {
            id: context.context.length,
            body: req.body.body
        };
        context.context.push(fileWriteObj);

        fs.writeFile(filePath, JSON.stringify(context), function (err) {
            if (err) throw err;
            console.log('Saved!');
            req.data = fileWriteObj;
            next();
        });
    });
};

post.supplement = function (req, res, next) {
    return response.success(res, 201, {data:  req.data });
};


module.exports = post;
