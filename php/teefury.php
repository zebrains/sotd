<?php

function get_teefury($data){
  $url = "http://www.teefury.com/rss/rss.xml";
  $affiliate = "";

  $feed = file_get_contents($url);
  $parser= new SimpleXMLElement($feed);

  $count = count($data);
  foreach ($parser -> entry as $entry) {
    $data[$count]['title'] = (string)$entry -> title;
    $data[$count]['content'] = (string)strchr(strchr($entry -> content, "http"),'"', true);
    $data[$count]['site'] = "Teefury";
    $data[$count]['cost'] = "$11";
    $data[$count]['shipping'] = "$3";
    $data[$count]['link'] = "http://teefury.com";
    $count++;
  }

  return($data);
}

?>
