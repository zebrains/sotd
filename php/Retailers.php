<?php
class retailers{

  public function get_woot($data)
  {
    $url = "http://api.woot.com/1/sales/current.rss";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);


    $count = count($data);
    //echo "Count:" . $count . "\r\n";
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

    //print_r($data);
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
    //echo "Count:" . $count . "\r\n";
    foreach ($parser -> entry as $entry) {
      $data[$count]['title'] = (string)$entry -> title;
      $data[$count]['content'] = (string)strchr(strchr($entry -> content, "http"),'"', true);
      $data[$count]['site'] = "TeeFury";
      $data[$count]['cost'] = "$11";
      $data[$count]['shipping'] = "$3";
      $data[$count]['link'] = "http://teefury.com";
      $count++;
    }

    //print_r($data);
    //print_r($parser);

    return $data ;
  }

  public function get_ript($data){
    $url = "https://www.riptapparel.com/rss/";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);

    $count = count($data);
    $index = 0;
    foreach ($parser -> channel -> item as $entry) {
      if ($index <= 2){
        $data[$count]['cost'] = "$11";
        $data[$count]['shipping'] = "$3";
      }
      else if ($index <= 5){
        $data[$count]['cost'] = "$16";
        $data[$count]['shipping'] = "$3";
      }
      if($index > 5){
        break;
      }

      $data[$count]['title'] = (string)$entry -> title;
      $data[$count]['content'] = (string)strchr(strchr($entry -> description, "http"),'"', true);
      $data[$count]['site'] = "Ript";

      $data[$count]['link'] = (string)$entry -> link;
      $count++;
      $index++;
    }

    return $data;
  }


}

?>
