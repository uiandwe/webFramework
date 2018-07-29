var sequelize = require('./sequelize');
var test = require("../model/test");
var collection_item = require("../model/collection_item");
var collection_page = require("../model/collection_page");
sequelize.define("test", test.fields, test.options);
sequelize.define("collection_item", collection_item.fields, collection_item.options);
sequelize.define("collection_page", collection_page.fields, collection_page.options);

module.exports = sequelize.models;