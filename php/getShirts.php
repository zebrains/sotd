<?php
require_once("Retailers.php");

$retailers = new Retailers();

$data = array();
$data = $retailers->get_woot($data);
$data = $retailers->get_teefury($data);
$data = $retailers->get_ript($data);

//print_r($data);

print json_encode($data);

?>
