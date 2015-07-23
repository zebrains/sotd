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

  public function get_yetee($data){

    $url = "http://theyetee.com/feeds/shirts.php";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);


    $count = count($data);
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

    return $data;

  }

  public function get_othertees($data){

    $url = "http://www.othertees.com/feed/";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser= new SimpleXMLElement($feed);

    $count = count($data);
    foreach ($parser -> channel -> item as $item) {

        if((time() - strtotime($item -> pubDate)) <= (60*60*24*2)){
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

    return $data;
  }

  public function get_qwertee($data){
    //TODO: figure out how to utilize qwertee
    $url = "http://www.qwertee.com/rss";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser = new SimpleXMLElement($feed);

    $count = count($data);
    $index = 0;
    foreach ($parser->channel->item as $item) {
      if($index <= 1){
        $data[$count]['cost'] = "$12";
      }
      elseif ($index <= 3) {
        $data[$count]['cost'] = "$14";
      }
      $data[$count]['title'] = (string)$item->title;
      $data[$count]['content'] = (string)strchr(strchr(substr(strchr($item -> description, "http://"), 1), "http://"),'"', true);
      $data[$count]['site'] = "Qwertee";
      $data[$count]['shipping'] = "$3";
      $data[$count]['link'] = (string)$item->guid;
      $count++;
    }

    return $data;
  }


  public function get_bustedtees($data){
    $url = "http://www.bustedtees.com/deals";
    $affiliate = "";

    $count = 0;
    $feed = file_get_contents($url);
    $dom = new DOMDocument();
    @$dom->loadHTML($feed);

    $xpath = new DOMXPath($dom);
    $elements = $xpath->query("//div[@id='deals-container']");

    foreach ($elements as $shirt) {
      //print_r($shirt);
      $data[$count]['title'] = $xpath->query("//span[@class='product_name']")->item($count)->nodeValue;
      $data[$count]['content'] = $xpath->query("//div[@id='deals-container']/ul/li/a/img/@src")->item($count)->nodeValue;
      $data[$count]['site'] = "BustedTees";
      $data[$count]['shipping'] = "$7";
      $data[$count]['cost'] = $xpath->query("//span[@class='sale_price']")->item($count)->nodeValue;
      $data[$count]['link'] = "http://bustedtees.com" . $xpath->query("//div[@id='deals-container']/ul/li/a/@href")->item($count)->nodeValue;
      $count++;
    }
    //print_r($data);
    return $data;
  }

  public function get_ubertee($data){
    $url = "https://www.ubertee.com/rss";
    $affiliate = "";

    $feed = file_get_contents($url);
    $parser = new SimpleXMLElement($feed);

    $count = count($data);
    $index = 0;
    foreach ($parser->channel->item as $shirt) {
      $data[$count]['title'] = (string)$shirt->title;
      $data[$count]['content'] = (string)strchr(strchr($shirt->description, "https://"),'"', true);
      $data[$count]['site'] = "Ubertee";
      $data[$count]['shipping'] = "?";
      $data[$count]['cost'] = "$12";
      $data[$count]['link'] = (string)$shirt->guid;
    }

    return $data;
  }
}

?>
