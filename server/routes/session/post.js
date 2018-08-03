var post = {};

post.validate = function () {
    return function (req, res, next) {
        console.log(req.params.id);
        next();

    };
};


post.setParameter = function () {
    return function (req, res, next){
        req.session.username = "test";

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
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = post;
