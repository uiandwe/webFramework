var get = {};

get.validate = function () {
    return function (req, res, next) {

        req.models.test.findById(req.params.id, function(status, data){
            if(status == 200){
                req.data = data;
                next();
            }
            else{
                res.statusCode = 404;
                return res.end(JSON.stringify({ data: "not finded!"}));
            }
        });

    };
};


get.setParameter = function () {
    return function (req, res, next){
        //req.data = {
        //    id: 1,
        //    title: "title",
        //    content: "content",
        //    category: "category1",
        //    tag: "tag1",
        //    createdAt: "2017-05-29 10:10"
        //};
        next();
    }
};

get.supplement = function () {
    return function (req, res, next) {
        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        return res.end(JSON.stringify({data:  req.data }));

    };
};


module.exports = get;
