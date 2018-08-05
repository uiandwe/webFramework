var get = {};

get.validate = function (req, res, next) {
    req.models.test.findById(1, function(status, data){
        console.log(status);
        var testData = data;
        console.log(testData.body);
    })

    console.log(req.params.id);
    next();
};


get.setParameter = function (req, res, next) {
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

get.supplement = function (req, res, next) {
    return response.success(res, 200, {data:  req.data });
};


module.exports = get;
