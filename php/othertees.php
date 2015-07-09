<?php

$url = "http://www.othertees.com/feed/";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$data = '';
$count = 0;
foreach ($parser -> channel -> item as $item) {

    if((time() - strtotime($item -> pubdate)) >= (60*60*24*2)){
      //print (time() - strtotime($item -> pubdate))." > ".(60*60*24*2)."<br/> ";
      $data[$count]['title'] = (string)$item -> title;
      $data[$count]['content'] = (string)strchr(strchr(substr(strchr($item -> description, "http://"), 1), "http://"),'"', true);
      $data[$count]['site'] = "OtherTees";
      $data[$count]['cost'] = "$11";
      $data[$count]['shipping'] = "$6";
      $data[$count]['link'] = (string)$item -> guid;
      $count++;
    }
}

//print_r($parser);

print json_encode($data);

?>
