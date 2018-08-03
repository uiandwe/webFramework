var post = {};
var file = require('../../utils/file');
var fs = require('fs');

post.validate = function () {
    return function (req, res, next) {
        if(req.files){
            file.save(req.files, function(data){
                console.log(data);
                if(data){
                    req.fileData = data;
                    next();
                }
                else{

                }
            });
        }
        else{
            next();
        }
    };
};


post.setParameter = function () {
    return function (req, res, next){
        req.data = {
            id: 1,
            title: "title",
            content: "content",
            category: "category1",
            tag: "tag1",
            createdAt: "2017-05-29 10:10"
        };
        next();
    }
};

post.supplement = function () {
    return function (req, res, next) {

        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = post;
