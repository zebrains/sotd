<?php

$url = "http://api.woot.com/1/sales/current.rss";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$data = '';
$count = 0;
foreach ($parser -> channel -> item as $item) {
  if (strpos((string)$item -> link, "shirt.woot") !== false) {
    $woot = $item -> children('http://www.woot.com/');
    $data[0]['title'] = (string)$item -> title;
    $data[0]['content'] = (string)$woot -> standardimage;
    $data[0]['site'] = "Woot!";
    $data[0]['cost'] = (string)$woot -> price;
    $data[0]['shipping'] = "$5";
    $data[0]['link'] = (string)$item -> link;
  }
}

//print_r($parser);

print json_encode($data);

?>
