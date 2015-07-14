<?php
include 'Retailers.php';

class WootTest extends PHPUnit_Framework_TestCase {

  protected $data;

  protected function setUp() {
    $a = new Retailers();
    $this->data = $a->get_woot($this->data);
  }


  public function testWootArray() {
    print_r($this->data);
    $this->assertGreaterThan(0, count($this->data), "Woot array is not of the right size");
  }

  /**
   * depends testWootArray
   */
  public function testWootData() {
    $this->assertFalse('' == (string)$this->data[0]['title'], "Title is missing from Shirt.Woot");
    $this->assertFalse('' == (string)$this->data[0]['content'], "Content is missing from Shirt.Woot");
    $this->assertTrue('Woot!' == (string)$this->data[0]['site'], "Site is not Woot");
    $this->assertFalse('' == (string)$this->data[0]['cost'], "Cost is missing from Shirt.Woot");
    $this->assertFalse('' == (string)$this->data[0]['shipping'], "Shipping is empty for Shirt.Woot");
    $this->assertFalse('' == (string)$this->data[0]['link'], "Link is missing from Shirt.Woot");
  }

  /**
   * depends testWootArray
   */
  public function testWootLinks() {
    $this->assertRegexp('/http[s]*:\/\//', (string)$this->data[0]['content'], "Content image does not begin with 'http://'");
    $this->assertRegexp('/http[s]*:\/\//', (string)$this->data[0]['link'], "Web link does not begin with 'http://'");
  }


}

class TeeFuryTest extends PHPUnit_Framework_TestCase {

  protected $data;

  protected function setUp(){
    $a = new Retailers();
    $this->data = $a->get_teefury($this->data);
  }

  public function testTeeFuryArray(){
    print_r($this->data);
    $this->assertGreaterThan(0, count($this->data), "TeeFury array is not of the right size");
  }

  /**
   * depends testTeeFuryArray
   */
  public function testTeeFuryData(){
    foreach ($this->data as $shirt){
      $this->assertFalse('' == (string)$shirt['title'], "Title is missing from TeeFury");
      $this->assertFalse('' == (string)$shirt['content'], "Content is missing from TeeFury");
      $this->assertTrue('TeeFury' == (string)$shirt['site'], "Site is not TeeFury");
      $this->assertFalse('' == (string)$shirt['cost'], "Cost is missing from TeeFury");
      $this->assertFalse('' == (string)$shirt['shipping'], "Shipping is empty for TeeFury");
      $this->assertFalse('' == (string)$shirt['link'], "Link is missing from TeeFury");
    }
  }

}



?>
