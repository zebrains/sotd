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

retailers = [
'CREATE (:retailer {name:"BustedTees", url:"http://www.bustedtees.com/deals"})',
'CREATE (:retailer {name:"OtherTees", url:"https://www.othertees.com/"})',
'CREATE (:retailer {name:"Qwertee", url:"https://www.qwertee.com/"})',
'CREATE (:retailer {name:"Ript", url:"https://www.riptapparel.com/"})',
'CREATE (:retailer {name:"ShirtPunch", url:"https://www.shirtpunch.com"})',
'CREATE (:retailer {name:"Teefury", url:"https://www.teefury.com/"})',
'CREATE (:retailer {name:"Unamee", url:"https://www.unamee.com/"})',
'CREATE (:retailer {name:"Woot", url:"https://shirt.woot.com/"})',
'CREATE (:retailer {name:"Yetee", url:"https://www.theyetee.com/"})'
]

for(var i=0; i<retailers.length; i++){
  runCypherQuery(
    retailers[i],
    {},
    function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        console.log(resp);
      }
    }
  );
}
