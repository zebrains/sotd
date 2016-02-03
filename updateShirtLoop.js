var exec = require('child_process').exec;

var log4js = require('log4js');
var log = log4js.getLogger('mylogger');

function updateShirts(){
  log.info('Starting shirt updates');
  exec('node update.js', {}, function(err, stdout, stderr){
    if (err){
      throw err;
    } else {
      //console.log(stdout);
      log.info("Shirt updates complete");

    }
  })
}

setInterval(updateShirts, 30*1000);
