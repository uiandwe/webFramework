var fs = require('fs');

module.exports = {
    save: function (files, callback) {
        if(files){

            var timeInMs = Date.now();
            var folderPath = __dirname + "/../static/" + timeInMs;

            if (!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath);
            }


            if(files.constructor == Array){
                /* TODO 파일 여러개 일때 저장 로직 추가 */

            }
            else{
                fs.readFile(files.files.path, function (error, data) {
                    var filePath = __dirname + "/../static/" + timeInMs + "/"+ files.files.name;
                    fs.writeFile(filePath, data, function (error) {

                        if (error) {
                            throw error;
                        } else {
                            callback({folder: timeInMs, filePath: filePath});
                        }

                    });
                });
            }
        }
    }
};
