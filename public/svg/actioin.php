<?php

include("config_tc.php");

	$userData = count($_POST["amount"]);
	$b_namenew  = $_POST["b_name"];
    $query_main  = "INSERT INTO billing_name (bill_name) VALUES ('$b_namenew')";
			$result_main = mysqli_query($db, $query_main);
            $sqllist = "SELECT * FROM billing_name WHERE bill_name = '$b_namenew'";
            $resultlist = mysqli_query($db,$sqllist);
            $rowlist = mysqli_fetch_array($resultlist,MYSQLI_ASSOC);
            $active = $rowlist['id'];
	if ($userData > 0) {
	    for ($i=0; $i < $userData; $i++) { 
		if (trim($_POST['amount'] != '') && trim($_POST['service'] != '')) {
			$b_name   = $active;
			$service  = $_POST["service"][$i];
			$amount   = $_POST["amount"][$i];
			$query  = "INSERT INTO biling (b_name,service,amount) VALUES ('$b_name','$service','$amount')";
			$result = mysqli_query($db, $query);
		}
	    }
	    echo "Data inserted successfully";
	}else{
	    echo "Please Enter user name";
	}

?>