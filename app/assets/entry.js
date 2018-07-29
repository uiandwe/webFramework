/**
 * Created by uiandwe on 2017. 10. 15..
 */

require('!style!css!./css/main.scss');

var hello = require('./js/hello');
var world = require('./js/world');
var main = require('./js/main');

// import 'expose-loader?$!expose-loader?jQuery!jquery'

document.write(hello + ', ' + world + '!');
