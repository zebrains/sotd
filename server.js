var ath = require('./auth/auth.js');

var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var host = 'localhost', port = 7474;
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

var auth = "Basic " + new Buffer(ath.username + ":" + ath.password).toString("base64");

app.use(express.static('html'));


function runCypherQuery(query, params, callback) {
  request.post({
      uri: httpUrlForTransaction,
      headers : {
            "Authorization" : auth
      },
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
      callback(err, body);
    })
}

function convertToShirts(rawShirts, res){
  var shirts = [];
  var shirt = {};

  for (var i=0; i<rawShirts['results'][0]['data'].length; i++){
    var data = rawShirts['results'][0]['data'][i]['row']
    console.log(JSON.stringify(data));

    shirt.site = data[0];
    shirt.title = data[1]['name'];
    shirt.background = data[1]['background'];
    shirt.content = data[1]['content'];
    shirt.link = data[1]['link'];
    shirt.cost = data[2];
    shirt.shipping = data[3];

    shirts.push(shirt);
    shirt = {};
  }

  res.send(JSON.stringify(shirts, null, 2));
}



app.get('/getShirts', function(req, res){
  console.log(query);

  if (req.query.sorting == "price"){
    console.log("Using sorting by price query.");
    var query = "MATCH (shirt:shirt)-[:soldBy]->(retailer) "+
            "WHERE shirt.lastUpdated >= (timestamp() - 30000) "+
            "RETURN retailer.name, shirt, retailer.defaultPrice, retailer.defaultShipping "+
            "ORDER BY (retailer.defaultPrice + retailer.defaultShipping) ASC";
  } else {
    console.log("Defaulting to latest query.");
    var query = "MATCH (shirt:shirt)-[:soldBy]->(retailer) "+
            "WHERE shirt.lastUpdated >= (timestamp() - 30000) "+
            "RETURN retailer.name, shirt, retailer.defaultPrice, retailer.defaultShipping "+
            "ORDER BY ID(shirt) DESC";

  }


  console.log(query);

  runCypherQuery(query,{},
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        //res.send(JSON.stringify(resp, null, 2));
        convertToShirts(resp, res);
      }
    }
  );
});


//Complete Query
//Affiliate account created
app.get('/OtherTees', function(req, res){

  var url = 'https://www.OtherTees.com';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

      //#homepage > ul > li:nth-child(2) > div > div > div > div.product-wrapper > ul.product-slider.todays
      $('ul.mega-slider li div.container').each(function(i, element) {

        //#homepage > ul > li:nth-child(2) > div > div > div > h1
        shirt.name = $(this).find('div.col-md-6.main-slide h1').text();
        shirt.name = shirt.name.trim();

        var background = $(this).find('li div.ot-design ul.model-slider li').attr('style');
        if (typeof background == 'string'){
          shirt.background = background.substring(background.indexOf('#'));
        } else {
          shirt.background = null;
        }


        //li div.ot-design ul.model-slider li img
        shirt.content = url + $(this).find('li div.ot-design ul.model-slider li img').attr('src');
        shirt.link = "https://www.othertees.com/";

        shirt.price =
        shirt.shipping =

        shirts.push(shirt);
        shirt = {};
      });
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});

//Complete
//Affiliate email sent
app.get('/Qwertee', function(req, res){

  var url = 'https://www.qwertee.com/rss';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

      $('channel item').each(function(i, element) {

        shirt.name = $(this).find('title').text();

        //#just-fluffy > div > div.buy-wrap > div > div > div > div
        shirt.background = null;

        //#just-fluffy > div > div.buy-wrap > div > div > div > img.dynamic-image-design
        shirt.content = $(this).find('description').text();
        shirt.content = shirt.content.substring(shirt.content.indexOf('"') + 1);
        shirt.content = shirt.content.substring(0, shirt.content.indexOf('"'));

        shirt.link = $(this).find('link').text();

        shirts.push(shirt);
        shirt = {};
      });
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});

//Incomplete
//Affiliate email sent
app.get('/QwerteeShop',function(req, res){

    var url = 'https://www.qwertee.com';
    var shirts = [];
    var shirt = {};

    request(url, function(error, response, html){

      if(!error){
        var $ = cheerio.load(html, {
          xmlMode: true
        });

        $('div.index-tee-list-wrap ul.index-tee-list li').each(function(i, element) {

          shirt.name = $(this).find('div.hover-info a b').text();
          if (shirt.name !== ''){
            shirt.background = null;
            shirt.content = "http:" + $(this).find('div.inner a img').attr('src');
            shirt.link = url + $(this).find('div.inner a').attr('href');

            shirts.push(shirt);
          }
          shirt = {};
        });
      }
      res.send(JSON.stringify(shirts, null, 2));
    })
})

//Complete
//Affiliate email sent
app.get('/Ript', function(req, res){

  var url = 'https://www.riptapparel.com';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

      $('div.columns.medium-4.collection').each(function(i, element) {
        shirt.name = $(this).children().find('.design-info div div p a').text();

        //div.design-images div.images-carousel div div div div img
        shirt.content = "https:" + $(this).find('img.initial-art').attr('src');

        shirt.link = url + $(this).children().find('.design-info div div p a').attr('href');

        shirts.push(shirt);
        shirt = {};
      });
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
})

//Complete
//Affiliate email sent
app.get('/ShirtPunch', function(req, res){

  var url = 'http://www.shirtpunch.com/';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

      $('div.product.drop-shadow').each(function(i, element) {

        shirt.name = $(this).find('a img').attr('alt');
        shirt.content = $(this).find('a img').attr('src');
        shirt.link = $(this).find('a').attr('href');

        shirts.push(shirt);
        shirt = {};
      });
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});

//Complete
//Rakuten email sent to clear up suspended account.
app.get('/Teefury', function(req, res){

  var url = 'http://www.teefury.com/rss/rss.xml';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

      $('feed entry').each(function(i, element) {

        shirt.name = $(this).find('title').text();

        var content = $(this).find('content').text();
        content = content.substring(content.indexOf("http://"));
        shirt.content = content.substring(0, content.indexOf('"'));
        shirt.link = "https://teefury.com";

        shirts.push(shirt);
        shirt = {};
      });
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});

//Complete
// Ref Link = 'http://www.shareasale.com/r.cfm?u=1144472&b=527906&m=50011&afftrack=&urllink=' + content
app.get('/Unamee', function(req, res){

  var url = 'https://www.unamee.com/';
  var ref = 'http://www.shareasale.com/r.cfm?u=1144472&b=527906&m=50011&afftrack=&urllink=';

  var shirts = [];
  var shirt = {};

  getLinksAndContent(getTitle);

  function getLinksAndContent(callback){
    request(url, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html, {
          xmlMode: true
        });
        // Finally, we'll define the variables we're going to capture
        $('div.List_box_small').each(function(i, element) {
          //console.log("Links #"+i);

          shirt.background = $(this).find('div.list_img.themed').attr('style');
          if (typeof shirt.background == 'string'){
            shirt.background = shirt.background.substring(shirt.background.indexOf('#'));
          } else {
            shirt.background = null;
          }

          shirt.content = $(this).children().find('div a img').attr('src');
          shirt.link = ref + $(this).children().find('div.datetab div a').attr('href');
          shirts.push(shirt);
          shirt = {};
          //res.send(JSON.stringify(shirts, null, 2));
          //console.log(shirts);
          callback(shirts.length - 1, renderJson);
        });
      }
    });
  }

  function getTitle(index, callback){
    request(shirts[index].link, function(error, response, html){
      if(!error){
        var $ = cheerio.load(html, {
          xmlMode: true
        });
        //console.log("Title #"+index);
        shirts[index].name = $('div.t-shirt-design-name').text();
      } else {
        console.log("There was an error requesting a title.");
      }
      callback();
    });

  }

  function renderJson(){
    var total = 0;
    for(var i=0; i < shirts.length; i++){
      if (shirts[i].name != null){
        total++;
      }
      if (total == shirts.length){
        res.send(JSON.stringify(shirts, null, 2));
        //console.log(shirts);
      }
    }

    //res.send(JSON.stringify(shirts, null, 2));
  }

})

//Complete
app.get('/Woot', function(req, res){

  var url = 'https://shirt.woot.com/';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });


        shirt.name = $('div#content section div.photo-section a img.photo').attr('alt');
        shirt.content = $('div#content section div.photo-section a img.photo').attr('src');
        shirt.link = url +  $('div#content section div.photo-section a').attr('href');

        shirts.push(shirt);
        shirt = {};
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});

//Complete
app.get('/Yetee', function(req, res){

  var url = 'https://theyetee.com';
  var shirts = [];
  var shirt = {};

  request(url, function(error, response, html){

    if(!error){
      var $ = cheerio.load(html, {
        xmlMode: true
      });

        //body > div.frame > div.row.expand > div.hero-home > div.todays-tees.tees-2.artists-1 >
        shirt.name = $('div.featured-artists-wrapper div div div.artist-info div.title').text().trim();

        var content = $('div.cycle-slideshow div:nth-child(2) a div').attr('style');
        content = content.substring(content.indexOf("/"));
        shirt.content = url + content.substring(0, content.indexOf(")"));
        shirt.link = url;

        shirts.push(shirt);
        shirt = {};
    }
    res.send(JSON.stringify(shirts, null, 2));
  })
});




app.listen('8081');

//console.log('http://localhost:8081/BustedTees');
console.log('http://localhost:8081/OtherTees');
console.log('http://localhost:8081/Qwertee');
console.log('http://localhost:8081/QwerteeShop')
console.log('http://localhost:8081/Ript');
console.log('http://localhost:8081/ShirtPunch');
console.log('http://localhost:8081/Teefury');
console.log('http://localhost:8081/Unamee');
console.log('http://localhost:8081/Woot');
console.log('http://localhost:8081/Yetee')

exports = module.exports = app;
