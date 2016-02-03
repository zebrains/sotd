var fs = require('fs');
var jpeg = require('jpeg-js');
var request = require('request').defaults({encoding: null});

var host = 'localhost', port = 7474;
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';
var username = "neo4j";
var password = "steven304114";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

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


function getShirts(callback){
  var query = 'MATCH (shirt:shirt)-[:soldBy]->(retailer)'+
              'WHERE (shirt.background ="null" OR shirt.background ="undefined") AND (shirt.content =~ ".*jpg.*" OR shirt.content =~ ".*jpeg.*") '+
              'RETURN retailer.name, shirt';

  runCypherQuery(query,{},
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        callback(resp);
      }
    }
  );
}

function updateShirtLoop(resp){
  console.log(JSON.stringify(resp, null, 2));

  for (var i=0; i<resp['results'][0]['data'].length; i++){
    var retailer = resp['results'][0]['data'][i]['row'][0];
    var name = resp['results'][0]['data'][i]['row'][1]['name'];
    var imgUrl = resp['results'][0]['data'][i]['row'][1]['content'];

    decodeBackgroundColor(imgUrl, name, retailer, updateShirt);
  }
}

function decodeBackgroundColor(url, shirt, retailer, callback){
  request.get(url, function (error, response, body){
    if (!error && response.statusCode == 200) {
      var rawImageData = jpeg.decode(body);

      var r = rawImageData['data'][0].toString(16);
      var g = rawImageData['data'][1].toString(16);
      var b = rawImageData['data'][2].toString(16);

      var background = "#"+r+g+b;

      callback(background, shirt, retailer);

    } else {
      console.log("Error occurred trying to access the image");
    }
  })





  //console.log(background);

}

function updateShirt(background, shirt, retailer){
  var query = 'MATCH (shirt:shirt {name:"'+ shirt +'"})-[:soldBy]->(retailer {name: "'+ retailer +'"}) '+
              'SET shirt.background = "' + background +'"';

  runCypherQuery(query,{},
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    }
  );
}

function postResults(resp){
  console.log(JSON.stringify(resp, null, 2));
}

getShirts(updateShirtLoop);
