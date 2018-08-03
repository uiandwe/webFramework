var path = require('path');
var filePath = path.resolve(__filename, '../').split('/');
var resource = filePath[filePath.length - 1];
var APICreator = require("../../utils/apiCreator");

var post = require('./post.js');

var express = require('express');
var router = express.Router();

var api = {


    post : function(isShowParms) {
        return function(req, res, next) {

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
                var apiCreator = new APICreator(req, res, next);
                apiCreator.add(req.middles.validator(
                    params.acceptable,
                    params.essential,
                    params.resettable
                ));
                apiCreator.add(post.validate());
                apiCreator.add(post.requestMsa());
                apiCreator.add(post.supplement());
                apiCreator.run();

                delete apiCreator;
            }
            else{
                return params
            }


        };
    }
};


router.post('/', api.post());

module.exports.router = router;
module.exports.api = api;