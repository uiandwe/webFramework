var post = {};
var file = require('../../utils/file');

post.validate = function (req, res, next) {
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

post.setParameter = function (req, res, next) {
    req.data = {
        id: 1,
        title: "title",
        content: "content",
        category: "category1",
        tag: "tag1",
        createdAt: "2017-05-29 10:10"
    };
    next();
};

post.supplement = function (req, res, next) {
    return response.success(res, 201, {data:  req.data });
};

module.exports = post;
