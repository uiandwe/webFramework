var request = require("request");
var cheerio = require('cheerio');
var response = require("../../utils/response");
var post = {};

post.validate = function () {
    return function (req, res, next) {
        next();
    };
};

post.getPageList = function (){
    return function (req, res, next){

        var parseMyAwesomeHtml = function(html) {

            var $ = cheerio.load(html, {
                normalizeWhitespace: true,
                xmlMode: true
            });


            var _itemSection = $('ul#grid li._itemSection');
            var this$ = cheerio.load(_itemSection[0]);
            var link = this$('div.info_main a.a_link');
            req.link = link[0].attribs.href;
            next();
        };

        request( {
            headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
                'user-agent': "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36"
            },
            uri: "https://msearch.shopping.naver.com/search/all.nhn?origQuery="+encodeURI(req.body.keyword)+"&pagingIndex=1&viewType=lst&sort=rel&showFilter=true&selectedFilterTab=price&query="+encodeURI(req.body.keyword),
            method: 'GET'
        }, function (error, response, body) {
            if (!error) {
                parseMyAwesomeHtml(body);
            } else {
                console.log(error);
            }
        });
    }
}

post.getItemDetail = function () {
    return function (req, res, next){

        var parseMyAwesomeHtml = function(html) {

            const $ = cheerio.load(html, {
                normalizeWhitespace: true,
                xmlMode: true
            });

            var _itemSection = $('#per_list li._itemSection');
            req.data = {rows: []};
            req.page = {
                'keyword': req.body.keyword
            };

            for(var i=0; i<_itemSection.length; i++){
                const $ = cheerio.load(_itemSection[i]);
                var link = $('a.link_a')[0].attribs.href;
                var price = $('span.price em').html().replace('<span class=\"won\">&#xC6D0;</span>', "").replace(",", "");
                var name = $('span.goods_cell strong').text();

                req.data.rows.push({
                    price: parseInt(price),
                    name: name,
                    link: link
                });
            }

            next();
        };

        request( {
            headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
                'user-agent': "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36"
            },
            uri: req.link,
            method: 'GET'
        }, function (error, response, body) {
            if (!error) {
                parseMyAwesomeHtml(body);
            } else {
                console.log(error);
            }
        });
    }
};


post.saveCollectionPage = function(){
    return function (req, res, next){
        req.models.collection_page.createCollectionPage(req.page, function(status, data){
            if(status == 201){
                var collectionPage = data;
                for(var i=0; i<req.data.rows.length; i++){
                    req.data.rows[i].collectionPageId = collectionPage.id;
                }
                next();
            }
            else{
                return response.error(res, status, json.parse(data));
            }
        })
    }
};

post.saveCollectionItem = function(){
    return function (req, res, next){
        req.models.collection_item.createCollectionItem(req.data.rows, function(status, data){
            if(status == 201){
                next();
            }
            else{
                return response.error(res, status, json.parse(data));
            }
        })
    }
};


post.supplement = function () {
    return function (req, res, next) {
        console.log("req.data", req.data)
        return response.success(res, 201, {data:  req.data })

    };
};


module.exports = post;
