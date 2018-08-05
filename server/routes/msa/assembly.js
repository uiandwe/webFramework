var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];

var post = require('./post.js');

var express = require('express');
var router = express.Router();

var api = {


    post : function(isShowParms) {
        var params = {
            acceptable: [
                "params"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
            },
            title: 'msa test',
            state: 'development'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(post.validate);
            apiPromiseArray.push(post.requestMsa);
            apiPromiseArray.push(post.supplement);
            return apiPromiseArray;
        }
        else{
            return params
        }
    }
};


router.post('/', api.post());

module.exports.router = router;
module.exports.api = api;