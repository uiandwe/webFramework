var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];

var gets = require('./gets.js');
var post = require('./post.js');

var express = require('express');
var router = express.Router();

var api = {

    gets : function(isShowParms) {
        var params = {
            acceptable: [
            ],
            essential: [
            ],
            resettable: [],
            explains: {
            },
            title: 'list 조회',
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
                "keyword"
            ],
            essential: [
            ],
            resettable: [],
            explains: {
                "keyword": "검색 키워드"
            },
            title: '가격 크롤링',
            state: 'development'
        };

        if(!isShowParms){
            var apiPromiseArray = [];

            apiPromiseArray.push(post.validate);
            apiPromiseArray.push(post.getPageList);
            apiPromiseArray.push(post.getItemDetail);
            apiPromiseArray.push(post.saveCollectionPage);
            apiPromiseArray.push(post.saveCollectionItem);
            apiPromiseArray.push(post.supplement);

            return apiPromiseArray;
        }
        else{
            return params
        }
    }
};



router.get('/', api.gets());
router.post('/', api.post());

module.exports.router = router;
module.exports.api = api;