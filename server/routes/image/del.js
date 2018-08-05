var del = {};

del.validate = function (req, res, next) {
    console.log(req.params.id);
    next();
};


del.setParameter = function (req, res, next) {
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

del.supplement = function (req, res, next) {
    return function (req, res, next) {
        return response.success(res, 201, {data:  req.data });
    };
};


module.exports = del;
