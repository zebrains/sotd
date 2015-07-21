<?php

function validateRetailers(){
  //exec("phpunit --log-junit ./results.txt ./");
  $junit = file_get_contents("./results.txt");
  $parser = new SimpleXMLElement($junit);

  $count = 0;
  $Retailers = array();

  foreach ($parser->testsuite->testsuite as $test) {

    $position = strpos((string)$test['name'], "Test");
    $name = substr((string)$test['name'], 0, $position);

    $Retailers[$name] = "Passed";

    foreach ($test->testcase as $testcase) {
      if (isset($testcase->error)){
        //print("Error found \r\n");
        $Retailers[$name] = "Failed";
      }
    }
    $count++;
    //print_r($test);

  }
  //print_r($Retailers);
  return $Retailers;

}

?>
