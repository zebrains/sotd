<?php

$url = "http://api.woot.com/1/sales/current.rss";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$data = '';
$count = 0;
foreach ($parser -> channel -> item as $item) {
  if (strpos((string)$item -> link, "shirt.woot") !== false) {
    $data['title'] = (string)$item -> title;
    $data['content'] = (string)$item -> standardimage;
    $data['cost'] = (string)$item -> price;
    $data['shipping'] = "$5";
    $data['link'] = (string)$item -> link;
  }
}

//print $data;

print json_encode($data);

?>
