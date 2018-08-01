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
                var transaction = null;

                function requestMsaApi(t){

                    var funcs = [];

                    [''].forEach(function (item) {
                        (function (item) {
                            funcs.push(function (callback) {
                                console.log(item)

                                request.post({url:'http://localhost:8089/api/test',
                                        form: body},
                                    function(err, httpResponse ,body){
                                        if(err){
                                            t.rollback();
                                            callback(400, httpResponse);
                                        }
                                        else{
                                            body = JSON.parse(body);
                                            if(body.status == 201){
                                                callback(null, true);
                                            }
                                            else{
                                                callback(body.status, body.data);
                                            }
                                        }

                                    });
                            });
                        })(item);
                    });



                    async.series(funcs, function (errorCode, results) {
                        if (errorCode) {
                            console.log("requestMsaApi", errorCode);
                            throw new errorHandler.CustomSequelizeError(400, {
                                code: "400_0049"
                            });
                        }
                        else{
                            console.log("done");
                            transaction = true;
                            return true;
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
                        console.log(requestMsaApi(t));
                        return true;
                    });
                }



                sequelize.transaction(function (t) {
                    return createTest(t);
                }).catch(errorHandler.catchCallback(callback)).done(function () {
                    if (transaction) {
                        callback(201);
                    }
                    else{
                        callback(400)
                    }
                });

            }
        }),
        'hooks': {}
    }
};
