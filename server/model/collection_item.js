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
        'name': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'price': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        },
        'link': {
            'type': Sequelize.TEXT,
            'allowNull': false
        },
        'collectionPageId': {
            'type': Sequelize.INTEGER,
            'allowNull': false
        }
    },
    options: {
        'charset': 'utf8',
        'paranoid': true,
        // 'instanceMethods': Sequelize.Utils._.extend(mixin.options.instanceMethods, {}),
        'classMethods': Sequelize.Utils._.extend({
            "createCollectionItem": function(data, callback){

                function createBulkcollectionItems (t) {
                    return sequelize.models.collection_item.bulkCreate(data, {
                        transaction: t
                    }).then(function () {
                        return true;
                    });
                }

                sequelize.transaction(function (t) {
                    return createBulkcollectionItems(t);
                }).catch(errorHandler.catchCallback(callback)).done(function (isSuccess) {
                    if (isSuccess) {
                        callback(201);
                    }
                });
            }

        }),
        'hooks': {}
    }
};
