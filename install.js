var ath = require('./auth/auth.js');

var request = require('request');
var auth = "Basic " + new Buffer(ath.username + ":" + ath.password).toString("base64");

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
//'CREATE (:retailer {name:"BustedTees", url:"http://www.bustedtees.com/deals"})',
'CREATE (:retailer {name:"OtherTees", url:"https://www.othertees.com/", defaultPrice: "$11", defaultShipping: "$6"})',
'CREATE (:retailer {name:"Qwertee", url:"https://www.qwertee.com/", defaultPrice: "$12", defaultShipping: "$3"})',
'CREATE (:retailer {name:"QwerteeShop", url:"http://www.qwertee.com/", defaultPrice: "$15", defaultShipping: "$3"})',
'CREATE (:retailer {name:"Ript", url:"https://www.riptapparel.com/", defaultPrice: "$11", defaultShipping: "$5"})',
'CREATE (:retailer {name:"ShirtPunch", url:"https://www.shirtpunch.com", defaultPrice: "$10", defaultShipping: "$4"})',
'CREATE (:retailer {name:"Teefury", url:"https://www.teefury.com/", defaultPrice: "$11", defaultShipping: "$3"})',
'CREATE (:retailer {name:"Unamee", url:"https://www.unamee.com/", defaultPrice: "$11", defaultShipping: "$4"})',
'CREATE (:retailer {name:"Woot", url:"https://shirt.woot.com/", defaultPrice: "$7", defaultShipping: "$5"})',
'CREATE (:retailer {name:"Yetee", url:"https://www.theyetee.com/", defaultPrice: "$11", defaultShipping: "$4"})'
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
