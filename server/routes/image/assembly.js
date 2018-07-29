var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var APICreator = require("../../utils/apiCreator");


var get = require('./' + resource + '.get.js');
var post = require('./' + resource + '.post.js');
var del = require('./' + resource + '.del.js');

var express = require('express');
var router = express.Router();

var api = {
    get : function(isShowParms) {
        return function(req, res, next) {

            var params = {
                acceptable: ["id"],
                essential: ["id"],
                resettable: [],
                explains: {
                    "id": "article ID - 해당 값은 주소 맨뒤로 붙을 것임. (바디/쿼리가 아님)"
                },
                // role: STD.user.roleHeavyUser,
                title: '글 상세 조회 (id)',
                state: 'development'
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(get.validate());
                apiCreator.add(get.setParameter());
                apiCreator.add(get.supplement());
                apiCreator.run();

                delete apiCreator;
            }
            else{
                return params;
            }
        };
    },
    post : function(isShowParms) {
        return function(req, res, next) {

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
                // role: STD.user.roleHeavyUser,
                title: '글 저장',
                state: 'development',
                files: 1
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(post.validate());
                apiCreator.add(post.setParameter());
                apiCreator.add(post.supplement());
                apiCreator.run();

                delete apiCreator;
            }
            else{
                return params
            }


        };
    },
    delete : function(isShowParms) {
        return function(req, res, next) {

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
                // role: STD.user.roleHeavyUser,
                title: '글 삭제',
                state: 'development'
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(del.validate());
                apiCreator.add(del.setParameter());
                apiCreator.add(del.supplement());
                apiCreator.run();

                delete apiCreator;
            }
            else{
                return params
            }


        };
    }
};




router.get('/:id', api.get());
router.post('/', multipartMiddleware, api.post());
router.delete('/:id', api.delete());

module.exports.router = router;
module.exports.api = api;