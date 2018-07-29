module.exports = {
    success: function (res, status, data) {
        res.set('cache-control', 'no-cache, no-store, must-revalidate');
        res.set('pragma',  'no-cache');
        res.set('expires', 0);
        res.statusCode = status | 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({status: status, data: data});
    },
    error: function(res, status, data){
        if(status == 500){
            console.error(err);
        }
        if (data && data.constructor && data.constructor == Object){
            data = json.parse(data);
        }
        return res.status(status).json({status: status, data: data});
    }
};
