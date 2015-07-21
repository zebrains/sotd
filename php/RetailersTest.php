<?php
include 'Retailers.php';

class WootTest extends PHPUnit_Framework_TestCase {

  protected $data;

  protected function setUp() {
    $a = new Retailers();
    $this->data = $a->get_woot($this->data);
  }


  public function testWootArray() {
    //print_r($this->data);
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
    $this->assertTrue('$5' == (string)$this->data[0]['shipping'], "Shipping is empty for Shirt.Woot");
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
    //print_r($this->data);
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
      $this->assertTrue('$11' == (string)$shirt['cost'], "Cost is missing from TeeFury");
      $this->assertTrue('$3' == (string)$shirt['shipping'], "Shipping is empty for TeeFury");
      $this->assertFalse('' == (string)$shirt['link'], "Link is missing from TeeFury");
    }
  }
}

class RiptTest extends PHPUnit_Framework_TestCase {

  protected $data;

  protected function setUp(){
    $a = new Retailers();
    $this->data = $a->get_ript($this->data);
  }

  public function testRiptArray(){
    //print_r($this->data);
    $this->assertGreaterThan(0, count($this->data), "Ript array is not of the right size");
  }

  /**
   * depends testRiptArray
   */
  public function testRiptData(){
    foreach ($this->data as $shirt){
      $this->assertFalse('' == (string)$shirt['title'], "Title is missing from Ript");
      $this->assertFalse('' == (string)$shirt['content'], "Content is missing from Ript");
      $this->assertTrue('Ript' == (string)$shirt['site'], "Site is not Ript");
      $this->assertFalse('' == (string)$shirt['cost'], "Cost is missing from Ript");
      $this->assertTrue('$3' == (string)$shirt['shipping'], "Shipping is empty for Ript");
      $this->assertFalse('' == (string)$shirt['link'], "Link is missing from Ript");
    }
  }
}

class YeteeTest extends PHPUnit_Framework_TestCase{

  protected $data;

  protected function setUp(){
    $a = new Retailers();
    $this->data = $a->get_yetee($this->data);
  }

  public function testYeteeArray(){
    $this->assertGreaterThan(0, count($this->data), "Yetee array is borked");
  }

  /**
   * depends testYeteeArray
   */
  public function testYeteeData(){
    foreach ($this->data as $shirt) {
      $this->assertFalse('' == (string)$shirt['title'], "Title is missing from Yetee");
      $this->assertFalse('' == (string)$shirt['content'], "Content is missing from Yetee");
      $this->assertTrue('Yetee' == (string)$shirt['site'], "Site is not Yetee");
      $this->assertTrue('$11' == (string)$shirt['cost'], "Cost is missing from Yetee");
      $this->assertTrue('$4' == (string)$shirt['shipping'], "Shipping is missing from Yetee");
      $this->assertFalse('' == (string)$shirt['link'], "Link is missing from Yetee");
    }
  }

}

class OtherTeesTest extends PHPUnit_Framework_TestCase{

  protected $data;

  protected function setUp(){
    $a = new Retailers();
    $this->data = $a->get_othertees($this->data);
  }

  public function testOtherTeesArray(){
    $this->assertGreaterThan(0, count($this->data), "OtherTees array is borked");
  }

  /**
   * depends testRiptArray
   */
  public function testOtherTeesData(){
    foreach ($this->data as $shirt) {
      $this->assertFalse('' == (string)$shirt['title'], "Title is missing from OtherTees");
      $this->assertFalse('' == (string)$shirt['content'], "Content is missing from OtherTees");
      $this->assertTrue('OtherTees' == (string)$shirt['site'], "Site is not OtherTees");
      $this->assertFalse('' == (string)$shirt['cost'], "Cost is missing from OtherTees");
      $this->assertFalse('' == (string)$shirt['shipping'], "Shipping is missing from OtherTees");
      $this->assertFalse('' == (string)$shirt['link'], "Link is missing from OtherTees");
    }
  }

}



?>
