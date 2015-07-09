<?php

$now = time();
$pub = strtotime("Wed, 08 Jul 2015 22:00:00 +0200");

$difference = $now - $pub;
if($difference >= (60*60*24*2)){
  echo "More than 48 hours!";
} else {
  echo "Not more than 48 hours";
}

?>
