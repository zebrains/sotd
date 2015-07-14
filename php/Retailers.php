<?php
class retailers{

  public function get_woot($data)
  {
    $url = "http://api.woot.com/1/sales/current.rss";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);


    $count = count($data);
    echo "Count:" . $count . "\r\n";
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

    print_r($data);
    //print_r($parser);

    return $data;
  }


  public function get_teefury($data)
  {
    $url = "http://www.teefury.com/rss/rss.xml";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);

    $count = count($data);
    echo "Count:" . $count . "\r\n";
    foreach ($parser -> entry as $entry) {
      $data[$count]['title'] = (string)$entry -> title;
      $data[$count]['content'] = (string)strchr(strchr($entry -> content, "http"),'"', true);
      $data[$count]['site'] = "TeeFury";
      $data[$count]['cost'] = "$11";
      $data[$count]['shipping'] = "$3";
      $data[$count]['link'] = "http://teefury.com";
      $count++;
    }

    print_r($data);

    return $data ;
  }
}

?>
