/**
 * Test model module.
 * @module core/server/models/sequelize/test
 */

var Sequelize = require('sequelize');
var sequelize = require("../config/sequelize");
var errorHandler = require("../utils/sequelizeErrorHandler");
var mixin = require('./mixin');
var MICRO = require('microtime-nodejs');
var crypto = require('crypto');


module.exports = {
    fields: {
        'aid': {
            'type': Sequelize.STRING,
            'allowNull': true,
            'unique': true
        },
        'email': {
            'type': Sequelize.STRING,
            'allowNull': true,
            'unique': true
        },
        'secret': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'salt': {
            'type': Sequelize.STRING,
            'allowNull': false
        },
        'phoneNum': {
            'type': Sequelize.STRING,
            'allowNull': true,
            'unique': true
        },
        'name': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'nick': {
            'type': Sequelize.STRING,
            'allowNull': true,
            'unique': true
        },
        'gender': {
            'type': Sequelize.ENUM,
            'values': ['M', 'W'],
            'allowNull': true
        },
        'birth': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'di': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'ci': {
            'type': Sequelize.STRING,
            'allowNull': true
        },
        'passUpdatedAt': {
            'type': Sequelize.BIGINT,
            'allowNull': true,
            'defaultValue': MICRO.now()
        }
    },
    options: {
        'charset': 'utf8',
        'paranoid': true,
        'instanceMethods': Sequelize.Utils._.extend(mixin.options.instanceMethods, {
            /**
             * 비밀번호 인코딩
             * @param {string} secret - 인코딩할 평문 비밀번호
             * @returns {boolean}
             */
            'createHashPassword': function(secret){
              return crypto.pbkdf2Sync(secret, this.salt, 10000, 64, 'sha512').toString('base64');
            },
            /**
             * 비밀번호 암호화
             * @returns this.salt
             */
            'encryption': function(){
                this.salt = crypto.randomBytes(16).toString('base64');
                if(this.secret){
                    this.secret = this.createHashPassword(this.secret);
                }
                return this;
            }
        }),
        'classMethods': Sequelize.Utils._.extend(mixin.options.classMethods, {
            'createUser': function (data, callback) {
                var createdUser = null;
                sequelize.transaction(function (t) {
                    var user = sequelize.models.user.build(data);
                    user.encryption();
                    return user.save({transaction: t}).then(function () {
                        createdUser = user;
                    });

                }).catch(errorHandler.catchCallback(callback)).done(function () {
                    if (createdUser) {
                        callback(201, createdUser);
                    }
                });
            }
        }),
        'hooks': {}
    }
};
