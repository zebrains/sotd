<?php
require_once("Retailers.php");
require_once("validateRetailers.php");

$testStatus = validateRetailers();
$retailers = new Retailers();

$data = array();


if ($testStatus['BustedTees'] === "Passed"){
  $data = $retailers->get_bustedtees($data);
}

if ($testStatus['OtherTees'] === "Passed"){
  $data = $retailers->get_othertees($data);
}

if ($testStatus['Ript'] === "Passed"){
  $data = $retailers->get_ript($data);
}

if ($testStatus['TeeFury'] === "Passed"){
  $data = $retailers->get_teefury($data);
}

if ($testStatus['Ubertee'] === "Passed"){
  $data = $retailers->get_ubertee($data);
}

  $data = $retailers->get_umamee($data);


if ($testStatus['Woot'] === "Passed"){
  $data = $retailers->get_woot($data);
}

if ($testStatus['Yetee'] === "Passed"){
  $data = $retailers->get_yetee($data);
}





//$data = $retailers->get_qwertee($data); //Not implemented yet

//print_r($data);

print json_encode($data);

?>
