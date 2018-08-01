var request = require('request');


module.exports = {
  encodeQueryData: function (data) {
        let ret = [];
        for (let d in data) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
        return ret.join('&');
    },
  releaseOrderPromise: function (body) {
        var url = this.requestUrl() + '/api/trader-crm/release';
        return rp({
            url: url,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8;'
            },
            method: 'PUT',
            form: body
        }).then(function (body) {
            if (typeof body == 'string') {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    console.error(e);
                }
                return body;
            } else {
                return body;
            }
        });
    },
    returnComplete: function (body, callback) {
        var url = this.requestUrl() + '/api/trader-crm/return-complete/' + body.id;
        delete body.id;
        request.put({
            url: url,
            headers: {
                'Content-type': 'application/json;charset=UTF-8;'
            },
            form: body
        }, function (err, response, body) {
            if (err) {
                console.error(err);
                callback(400, {
                    code: '400_0007'
                });
            } else {
                if (response.statusCode == 204) {
                    callback(204);
                } else if (response.statusCode == 404) {
                    callback(404, {
                        code: '404_0005'
                    });
                } else {
                    callback(response.statusCode, body);
                }
            }
        });
    },
  findOrderReleaseImpossible: function (query, callback) {
        var url = this.requestUrl() + '/api/trader-crm/order-release-impossible?' + this.encodeQueryData(query);
        request.get({
            url: url,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8;'
            }
        }, function (err, response, body) {
            if (err) {
                console.error(err);
                callback(400, {
                    code: '400_0002'
                });
            } else {
                try {
                    body = JSON.parse(body);
                    if (response.statusCode == 200) {
                        callback(200, body);
                    } else if (response.statusCode == 404) {
                        callback(404, {
                            code: '404_0004'
                        });
                    } else {
                        callback(response.statusCode, body);
                    }
                } catch (e) {
                    console.error(e);
                    callback(400);
                }
            }
        });
    },
};
