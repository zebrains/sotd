<?php

$url = "http://theyetee.com/feeds/shirts.php";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$data = array('');
$count = 0;
foreach ($parser -> channel -> item as $entry) {
  //TODO: Remove Tanks and sold out items
  $data[$count]['title'] = (string)substr($entry -> title, 0, strpos($entry -> title, " by"));
  $data[$count]['content'] = (string)strchr(strchr($entry -> description, "http"),'"', true);
  $data[$count]['site'] = "Yetee";
  $data[$count]['cost'] = "$11";
  $data[$count]['shipping'] = "$4";
  $data[$count]['link'] = (string)$entry -> link;
  $count++;
}




print json_encode($data);


?>
