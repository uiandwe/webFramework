var path = require('path');
var request = require('request');
var Iconv = require('iconv').Iconv;
var fs = require('fs');
var http = require('http');
var FormData = require('form-data');


module.exports = {
    requestToFile: function(url, domain, port, method, data, file, callback){
        var form = data;

        form["file0"] = fs.createReadStream(__dirname + "/../files/export/"+file.files.name);

        var options = {
            url: domain+':'+port+url,
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8'
                // 'Cookie': cookie
            },
            formData: form
        };
        request(options, function (err, res, body) {
            if (err) {
                console.error(err);
            } else {
                callback(res.statusCode, body);
            }
        });
    },
    requestUrl: function(url, domain, port, method, callback){
        var options = {
            method: method,
            json: true,
            url: domain+':'+port+url,
            headers: {
                'Cookie': "cookie",
                'Content-Type': 'application/json'
            }
        };

        request(options, function (err, res, body) {
            if (err) {
                console.log('Error :', err)
                return
            }
            console.log(' Body :', body);
            callback(res.statusCode, body)

        });


    },
    requestFileDownload: function(url, domain, port, method, callback){

        var req = request.get(encodeURI('' ))
            .on( 'response', function( res ){

                // extract filename
                var filename = 'test.csv';

                // create file write stream
                var fws = fs.createWriteStream( filename );

                // setup piping
                res.pipe( fws );

                res.on( 'end', function(){
                    callback("200", {data: "file down done"})
                });
            });
    }
};