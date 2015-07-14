<?php

function get_woot($data){
  $url = "http://api.woot.com/1/sales/current.rss";
  $affiliate = "";

  $feed = file_get_contents($url);
  $parser= new SimpleXMLElement($feed);


  $count = count($data);
  foreach ($parser -> channel -> item as $item) {
    if (strpos((string)$item -> link, "shirt.woot") !== false) {
      $woot = $item -> children('http://www.woot.com/');
      $data[$count]['title'] = (string)$item -> title;
      $data[$count]['content'] = (string)$woot -> standardimage;
      $data[$count]['site'] = "Woot!";
      $data[$count]['cost'] = (string)$woot -> price;
      $data[$count]['shipping'] = "$5";
      $data[$count]['link'] = (string)$item -> link;
    }
  }

  //print_r($parser);

  return $data;
}

?>
