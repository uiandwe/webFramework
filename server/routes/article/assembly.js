var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];
var APICreator = require("../../utils/apiCreator");


var gets = require('./' + resource + '.gets.js');
var get = require('./' + resource + '.get.js');
var post = require('./' + resource + '.post.js');
var put = require('./' + resource + '.put.js');
var del = require('./' + resource + '.del.js');

var express = require('express');
var router = express.Router();

var api = {
    get : function(isShowParms) {
        return function(req, res, next) {

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
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
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
    gets : function(isShowParms) {
        return function(req, res, next) {

            var params = {
                acceptable: [
                    "body"
                    // "size",
                    // "last"
                ],
                essential: [
                    // "size",
                    // "last"
                ],
                resettable: [],
                explains: {
                    "size": "gets 갯수 ",
                    "last": "마지막 데이터 createdAt값 "
                },
                // role: STD.user.roleHeavyUser,
                title: '글 list 조회',
                state: 'development'
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
                apiCreator.add(gets.validate());
                apiCreator.add(gets.setParameter());
                apiCreator.add(gets.supplement());
                apiCreator.run();

                delete apiCreator;
            }
            else{
                return params
            }


        };
    },
    post : function(isShowParms) {
        return function(req, res, next) {

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
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
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
    put : function(isShowParms) {
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
                title: '글 수정',
                state: 'development',
                param: 'id'
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
                apiCreator.add(put.validate());
                apiCreator.add(put.getTest());
                apiCreator.add(put.setParameter());
                apiCreator.add(put.supplement());
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
                    // "body"
                ],
                essential: [
                ],
                resettable: [],
                explains: {
                    "body": "본문"
                },
                // role: STD.user.roleHeavyUser,
                title: '글 삭제',
                state: 'development',
                param: 'id'
            };

            if(!isShowParms){
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
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



router.get('/', api.gets());
router.get('/:id', api.get());
router.post('/', api.post());
router.put('/:id', api.put());
router.delete('/:id', api.delete());

module.exports.router = router;
module.exports.api = api;