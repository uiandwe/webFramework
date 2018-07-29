module.exports.connect = function () {
    return function (req, res, next) {
        var middles = {
            validator: require('./validator')()
        };
        req.middles = middles;
        next();
    };
};