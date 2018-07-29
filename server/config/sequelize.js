"use strict";

var Sequelize = require('sequelize');
require('sequelize-definer')(Sequelize);
var common = require('../meta/config/common');

var connectObject = {
    host: common.db.hostname,
    dialect: common.db.protocol,
    port: common.db.port,
    define: {
        underscored: false,
        freezeTableName: false,
        syncOnAssociation: true,
        charset: 'utf8mb4',
        collate: 'utf8_general_ci',
        timestamps: true
    }
};

if (common.db.hostname == 'localhost') {
    connectObject.dialectOptions = {
        socketPath: '/tmp/mysql.sock',
        supportBigNumbers: true,
        bigNumberStrings: true
    }
}

var sequelize = new Sequelize(common.db.database, common.db.username, common.db.password, connectObject);

module.exports = sequelize;