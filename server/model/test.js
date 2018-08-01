/**
 * Test model module.
 * @module core/server/models/sequelize/test
 */

var Sequelize = require('sequelize');
var sequelize = require("../config/sequelize");
var mixin = require('./mixin');
var errorHandler = require("../utils/sequelizeErrorHandler");
var request = require('request');
var rp = require('request-promise');
var async = require('async');

module.exports = {
    fields: {
        'authorId': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'userId': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'body': {
            'type': Sequelize.STRING,
            'allowNull': false
        }
    },
    options: {
        'charset': 'utf8',
        'paranoid': true, // deletedAt 추가. delete안함.
        'instanceMethods': Sequelize.Utils._.extend(mixin.options.instanceMethods, {}),
        'classMethods': Sequelize.Utils._.extend({
            "findById": function( id, callback){
                var loadedData = null;
                var t = false;

                var where = {
                    id : id
                };
                var query = {
                    "where": where
                };

                sequelize.models.test.find(query).then(function (data) {
                    t = true;
                    loadedData = data;
                }).catch(function(){

                }).done(function () {
                    if (t) {
                        if (loadedData) {
                            callback(200, loadedData);
                        } else {
                            callback(404);
                        }
                    }
                });
            },
            "requestApi": function(body, callback){
                var t = null;

                function requestMsaApi(t){

                    var options = {
                        method: 'POST',
                        uri: 'http://localhost:8089/api/test',
                        body: {
                            some: 'payload'
                        },
                        json: true,
                        resolveWithFullResponse: true
                    };

                    return rp(options).promise().bind(this)
                        .then(function (parsedBody) {
                            var status = parsedBody.body.status;
                            var data = parsedBody.body.data;

                            if(status == 201){
                                return true;
                            }
                            else{
                                callback(body.status, body.data);
                            }
                        })
                        .catch(function (err) {
                            if(err){
                                return false;
                            }
                        });

                }


                function createTest(t){
                    return sequelize.models.test.create({
                        authorId: 1,
                        userId: 1,
                        body: 'msa'
                    },{
                        transaction: t
                    }).then(function (data) {
                        return requestMsaApi(t);
                    });
                }


                sequelize.transaction({ autocommit: false }).then(function (transaction) {
                    t = transaction;
                    return createTest(t);
                }).catch(errorHandler.catchCallback(callback)).done(function (isSuccess) {
                    if (isSuccess) {
                        callback(201);
                    }
                    else{
                        t.rollback();
                        callback(400)
                    }
                });

            }
        }),
        'hooks': {}
    }
};
