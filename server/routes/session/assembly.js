var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];


var get = require('./get.js');
var post = require('./post.js');
var del = require('./del.js');

var express = require('express');
var router = express.Router();

var api = {
    get : function(isShowParms) {
        var params = {
            acceptable: [],
            essential: [],
            resettable: [],
            explains: {
                "id": "article ID - 해당 값은 주소 맨뒤로 붙을 것임. (바디/쿼리가 아님)"
            },
            title: '사용자 정보',
            state: 'development',
            param: 'id'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(get.validate);
            apiPromiseArray.push(get.setParameter);
            apiPromiseArray.push(get.supplement);
            return apiPromiseArray;
        }
        else{
            return params;
        }
    },
    post : function(isShowParms) {
        var params = {
            acceptable: [
                "id",
                "pass"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
                "id": "id",
                "pass": "pass"
            },
            title: '로그인',
            state: 'development'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(post.validate);
            apiPromiseArray.push(post.setParameter);
            apiPromiseArray.push(post.supplement);
            return apiPromiseArray;
        }
        else{
            return params
        }
    },
    delete : function(isShowParms) {
        var params = {
            acceptable: [
                "body"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
                "body": "본문"
            },
            title: '로그아웃',
            state: 'development'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(del.validate);
            apiPromiseArray.push(del.setParameter);
            apiPromiseArray.push(del.supplement);
            return apiPromiseArray;
        }
        else{
            return params
        }
    }
};




router.get('/:id', api.get());
router.post('/', api.post());
router.delete('/:id', api.delete());

module.exports.router = router;
module.exports.api = api;