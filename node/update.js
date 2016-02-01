var username = "neo4j";
var password = "steven304114";
var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
var request = require('request');

var host = 'localhost', port = 7474;
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

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

getRetailers(updateRetailers);

function getRetailers(callback){
  runCypherQuery("MATCH (r:retailer) RETURN r",{},
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        callback(resp);
      }
    }
  );
}


function updateRetailers(retailers){
  //console.log(JSON.stringify(retailers));
  //console.log(JSON.stringify(retailers['results'][0]['data'], null, 4));
  for (var i=0; i<retailers['results'][0]['data'].length; i++){

    var data = retailers['results'][0]['data'][i]['row'][0];
    console.log(data);

    request("http://localhost:8081/"+ data['name'], function (error, response, body) {
      if (!error && response.statusCode == 200) {
        shirts = JSON.parse(body);

        for (var j = 0; j<shirts.length; j++){
          var query = "MATCH (r:retailer {name:'"+ data['name'] +"'})"+
                      "CREATE (s:shirt {title: '"+ shirts[j].title +"', background: '"+ shirts[j].background +"', content: '"+ shirts[j].content +"', link: '"+ shirts[j].link +"'}) - [:soldBy] -> (r)";

          console.log(query);

          runCypherQuery(query, {},
            function (err, resp) {
              if (err) {
                console.log(err);
              } else {
                console.log(resp);
              }
            }
          );
        }
      }
    });
  }
}

/*
*/
