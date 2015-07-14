<?php
// TODO: INCOMPLETE
$url = "https://www.riptapparel.com/rss/";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$count = count($data);
foreach ($parser -> channel -> item as $entry) {
  $data[$count]['title'] = $entry -> title;
  $data[$count]['content'] = strchr(strchr($entry -> content, "http"),'"', true);
  $data[$count]['site'] = "Ript";
  $data[$count]['cost'] = "$11";
  $data[$count]['shipping'] = "$3";
  $data[$count]['link'] = $entry -> link;
  $count++;
}

print json_encode($data);


?>
