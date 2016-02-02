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

function updateRetailersLoop(retailers){
  //console.log(JSON.stringify(retailers));
  //console.log(JSON.stringify(retailers['results'][0]['data'], null, 4));

  for (var i=0; i<retailers['results'][0]['data'].length; i++){

    var name = retailers['results'][0]['data'][i]['row'][0]['name'];
    //console.log(name);

    updateRetailer(name);
  }
}

function updateRetailer(name){
  request("http://localhost:8081/"+ name, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      shirts = JSON.parse(body);
      //console.log(JSON.stringify(shirts));

      for (var j=0; j<shirts.length; j++){
        var query = 'MATCH (r:retailer {name:"'+ name +'"}) '+
                    'MERGE (s:shirt {name: "'+ shirts[j].name +'"}) - [:soldBy] -> (r) '+
                    'ON CREATE SET s.background = "'+ shirts[j].background +'", s.content = "'+ shirts[j].content +'", s.link = "'+ shirts[j].link +'", s.lastUpdated = timestamp() '+
                    'ON MATCH SET s.lastUpdated = timestamp() ';
                    //'MERGE (s) - [:soldBy] -> (r)';
        console.log(query);

        runCypherQuery(query, {},
          function (err, resp) {
            if (err) {
              console.log(err);
            } else {
              //console.log(resp);
            }
          }
        );
      }
    } else {
      console.log("There was an error trying to reach http://localhost:8081/"+name);
    }
  });
}

getRetailers(updateRetailersLoop);
