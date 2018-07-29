/**
 * Test model module.
 * @module core/server/models/sequelize/test
 */

var Sequelize = require('sequelize');
var sequelize = require("../config/sequelize");
var errorHandler = require("../utils/sequelizeErrorHandler");
// var mixin = require('./mixin');

module.exports = {
    fields: {
        'keyword': {
            'type': Sequelize.STRING,
            'allowNull': false
        }
    },
    options: {
        'charset': 'utf8',
        'paranoid': true,
        // 'instanceMethods': Sequelize.Utils._.extend(mixin.options.instanceMethods, {}),
        'classMethods': Sequelize.Utils._.extend({
            "createCollectionPage": function(data, callback){
                function createCollectionPage (t) {
                    return sequelize.models.collection_page.create(data, {
                        transaction: t
                    }).then(function (data) {
                        return data;
                    });
                }

                sequelize.transaction(function (t) {
                    return createCollectionPage(t);
                }).catch(errorHandler.catchCallback(callback)).done(function (data) {
                    if (data) {
                        callback(201, data);
                    }
                });
            }
        }),
        'hooks': {}
    }
};
