var exec = require('child_process').exec;

var log4js = require('log4js');
var log = log4js.getLogger('mylogger');

function getBackgrounds(){
  log.info("Updating Missing Backgrounds");
  exec('node detectBackground.js', {}, function(err, stdout, stderr){
    if (err){
      log.fatal(stderr);
      throw err;
    } else {
      //console.log(stdout);
      log.info("Missing Backgrounds Updated");
    }
  })
}

setInterval(getBackgrounds, 30*1000);
