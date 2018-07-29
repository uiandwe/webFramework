var del = {};

del.validate = function () {
    return function (req, res, next) {
        console.log(req.params.id);
        next();

    };
};


del.setParameter = function () {
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

del.supplement = function () {
    return function (req, res, next) {

        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');

        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = del;
