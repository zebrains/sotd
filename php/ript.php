<?php
// TODO: INCOMPLETE
$url = "http://www.teefury.com/rss/rss.xml";
$affiliate = "";

$feed = file_get_contents($url);
$parser= new SimpleXMLElement($feed);

$data = array('');
$count = 0;
foreach ($parser -> entry as $entry) {
  $data[$count]['title'] = $entry -> title;
  $data[$count]['content'] = strchr(strchr($entry -> content, "http"),'"', true);
  $count++;
}

print json_encode($data);


?>
