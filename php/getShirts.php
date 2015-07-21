<?php
require_once("Retailers.php");
require_once("validateRetailers.php");

$testStatus = validateRetailers();
$retailers = new Retailers();

$data = array();
if ($testStatus['Woot'] === "Passed"){
  $data = $retailers->get_woot($data);
}

if ($testStatus['TeeFury'] === "Passed"){
  $data = $retailers->get_teefury($data);
}

if ($testStatus['Yetee'] === "Passed"){
  $data = $retailers->get_yetee($data);
}

if ($testStatus['OtherTees'] === "Passed"){
  $data = $retailers->get_othertees($data);
}

if ($testStatus['Ript'] === "Passed"){
  $data = $retailers->get_ript($data);
}

//$data = $retailers->get_qwertee($data); //Not implemented yet

//print_r($data);

print json_encode($data);

?>
