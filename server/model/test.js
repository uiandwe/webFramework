/**
 * Test model module.
 * @module core/server/models/sequelize/test
 */

var Sequelize = require('sequelize');
var sequelize = require("../config/sequelize");
// var mixin = require('./mixin');

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
        // 'instanceMethods': Sequelize.Utils._.extend(mixin.options.instanceMethods, {}),
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
        }),
        'hooks': {}
    }
};
