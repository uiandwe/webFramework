var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];


var gets = require('./gets.js');
var get = require('./get.js');
var post = require('./post.js');
var put = require('./put.js');
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
            title: '글 상세 조회 (id)',
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
    gets : function(isShowParms) {

        var params = {
            acceptable: [
                "body",
                "size",
                "last"
            ],
            essential: [],
            resettable: [],
            explains: {
                "size": "gets 갯수 ",
                "last": "마지막 데이터 createdAt값 "
            },
            title: '글 list 조회',
            state: 'development'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(gets.validate);
            apiPromiseArray.push(gets.setParameter);
            apiPromiseArray.push(gets.supplement);
            return apiPromiseArray;
        }
        else{
            return params
        }

    },
    post : function(isShowParms) {

        var params = {
            acceptable: [
                "authorId",
                "userId",
                "body"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
                "body": "본문"
            },
            title: '글 저장',
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
    put : function(isShowParms) {
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
            title: '글 수정',
            state: 'development',
            param: 'id'
        };

        if(!isShowParms){
            var apiPromiseArray = [];
            apiPromiseArray.push(put.validate);
            apiPromiseArray.push(put.getTest);
            apiPromiseArray.push(put.setParameter);
            apiPromiseArray.push(put.supplement);
            return apiPromiseArray;
        }
        else{
            return params
        }
    },
    delete : function(isShowParms) {
        var params = {
            acceptable: [
                // "body"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
                "body": "본문"
            },
            title: '글 삭제',
            state: 'development',
            param: 'id'
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
router.get('/', api.gets());
router.post('/', api.post());
router.put('/:id', api.put());
router.delete('/:id', api.delete());

module.exports.router = router;
module.exports.api = api;
