var post = {};

post.validate = function (req, res, next) {
    next();
};


post.setParameter = function (req, res, next) {
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
};

post.supplement = function (req, res, next) {
    return response.success(res, 201, {data:  req.data });
};


module.exports = post;
