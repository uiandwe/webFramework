var express = require('express');
var fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var multer = require('multer');
var utilsEland = require("../utils/innerApi");
var errorCode = require("../meta/errorCode");
var config = require("../meta/config/common");
var storage = multer.diskStorage({
    destination: function(req,file, cb){
      cb(null, './temp')
    },
    filename: function(req, file, cb){
      cb(null, file.originalname)
    }
});




var upload = multer({storage:storage});

var router = express.Router();
//
// router.get('/', function(req, res, next) {
//     var imgList = [];
//     res.render('index', { title: 'Express', files:imgList });
// });
//
//
// function validateText(text){
//     if(text == null || text == undefined || text == ''){
//         return "404";
//     }
// }
//
// function validateUrl(url){
//     var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
//         '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
//         '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
//         '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
//         '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
//         '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
//     return pattern.test(url);
// }
//
//
// function validateMagicUrl(message){
//     if(message.indexOf("[:URL:]") >= 0 ){
//         return true;
//     }
//     else{
//         return false;
//     }
// }
// function parse(str) {
//     var args = [].slice.call(arguments, 1),
//         i = 0;
//
//     return str.replace(/%s/g, function() {
//         return args[i++];
//     });
// }
//
//
//
// router.post('/api/message-include-csv', multipartMiddleware, function(req, res) {
//     /* 파라미터 확인 email / pass / title / message / redirectUrl / file */
//
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'application/json');
//     var errorText = " %s 파라미터가 없습니다.";
//
//     if(validateText(req.body.email) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "email" )}));
//     }
//
//     if(validateText(req.body.pass) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "pass" )}));
//     }
//
//     if(validateText(req.body.title) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "title" )}));
//     }
//
//     if(validateText(req.body.message) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "message" )}));
//     }
//
//     if(validateText(req.body.redirectUrl) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "redirectUrl" )}));
//     }
//
//     // var errorUrlText = "url 형식이 맞지 않습니다.";
//     // if(validateUrl(req.body.redirectUrl) == false){
//     //     res.end(JSON.stringify({data: parse(errorUrlText, "redirectUrl" )}));
//     // }
//
//     var errorMagicUrlText = " message에 [:URL:] 이 존재하지 않습니다.";
//     if(validateMagicUrl(req.body.message) == false){
//         res.end(JSON.stringify({data: parse(errorMagicUrlText, "message" )}));
//     }
//
//     /* file 체크 */
//     if(validateText(req.files) == "404" || validateText(req.files.files)){
//         res.end(JSON.stringify({data: parse(errorText, "file" )}));
//     }
//
//     var errorFileText = "csv 파일 형식이 아닙니다.";
//     if(req.files.files.type !=  "text/csv" || req.files.files.name.indexOf(".csv") < 0){
//         res.end(JSON.stringify({data: parse(errorFileText, "file" )}));
//     }
//
//     var APP = config.app;
//     /* 파일 없을 경우 오류 */
//     fs.readFile(req.files.files.path, function (error, data) {
//         var filePath = __dirname + "/../files/export/" + req.files.files.name;
//         fs.writeFile(filePath, data, function (error) {
//
//             if (error) {
//                 throw err;
//             } else {
//
//                 var path = "/api/eland/message-include-csv";
//                 var body = {
//                     email: req.body.email,
//                     pass: req.body.pass,
//                     title: req.body.title,
//                     message: req.body.message,
//                     redirectUrl: req.body.redirectUrl
//                 };
//                 utilsEland.requestAnalticsToFile(path, APP.domain, APP.port, "POST", body, req.files, function(status, data){
//                     // delete  req.files;
//                     console.log(status);
//                     console.log(data)
//                     res.statusCode = status;
//
//                     if(status == 200){
//                         data = JSON.parse(data);
//                         var returnData = {
//                             authorId: data.authorId,
//                             title: data.title,
//                             message: data.message,
//                             redirectUrl : data.redirectUrl,
//                             id: data.id,
//                             createdAt: data.createdAt,
//                             updatedAt: data.updatedAt
//
//                         };
//                         res.end(JSON.stringify({data: returnData}));
//                     }
//                     else{
//                         data = JSON.parse(data);
//                         var errorData = errorCode[data.code];
//                         res.end(JSON.stringify({data: errorData}));
//                     }
//                 });
//             }
//
//         });
//     });
//
// });
//
//
//
//
//
// router.get('/api/export-histories/:id', multipartMiddleware, function(req, res) {
//
//     var id = req.params.id;
//     console.log(id);
//
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'application/json');
//     var errorText = " %s 파라미터가 없습니다.";
//
//     if(validateText(req.params.id) == "404"){
//         res.end(JSON.stringify({data: parse(errorText, "id" )}));
//     }
//
//     var path = "/api/analytics/export-histories/"+id;
//     var APP = config.app;
//
//     utilsEland.requestAnaltics(path, APP.domain, APP.port, "GET", function(status, data){
//         // delete  req.files;
//         console.log(status);
//         console.log(data)
//         res.statusCode = status;
//
//         if(status == 200){
//             if(data.progress == 100 && data.errorCode == null){
//                 /* 100일때 파일 다운로드 */
//                 utilsEland.requestFileDownload(path, APP.domain, APP.port, "GET", function(status, body){
//                     console.log(status);
//                     console.log(body);
//
//                     res.end(JSON.stringify({data: data}));
//                 });
//             }
//             else{
//                 res.end(JSON.stringify({data: data}));
//             }
//         }
//         else{
//             data = JSON.parse(data);
//             var errorData = errorCode[data.code];
//             res.end(JSON.stringify({data: errorData}));
//         }
//     });
// });


var fs = require("fs"), path = require("path");

var  getApiDirectorys = function() {

    var retDirs = [];
    var p = path.resolve(__dirname, "../routes/");

    var files = fs.readdirSync(p);

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isDirectory();
    }).forEach(function (file) {
        var splited = file.split("/");
        var dirName = splited[splited.length - 1];
        retDirs.push(dirName);
    });

    return retDirs;
};


var getApiParams = function(app, categoryName){

    var apipath = path.resolve(__dirname +"/"+ categoryName +"/"+ "assembly");

    var assembly = require(apipath);
    app.use('/api/'+ categoryName, assembly.router);

    var api = assembly.api;

    var resourceObj = {
        resource : [],
        methods : []
    };

    for(var index in api){
        var params = api[index](true)();
        resourceObj.resource.push(params);
        resourceObj.methods.push(api[index].name);
    }

    return resourceObj;

};

module.exports = router;

module.exports = function(app){
    var routesList = getApiDirectorys();

    var apiFirstTempleteRouter = express.Router();
    app.use(apiFirstTempleteRouter);

    apiFirstTempleteRouter.get('/api/tester', function (req, res) {
        res.redirect('/api/tester/' + routesList[0] );
    });


    routesList.forEach(function(category){
        var apiTempleteRouter = express.Router();
        var resource = getApiParams(app, category);
        apiTempleteRouter.get('/api/tester/' + category,
            function (req, res) {
                res.render('api-tester', {
                    prefix: 'api',
                    categoryList: routesList,
                    resource: resource,
                    apiName: category
                    // currentCategory: catObj.name,
                    // currentResource: resourceName,
                    // version: packageJson.version,
                    // meta: req.meta
                });
            });
        app.use(apiTempleteRouter);

    })

}