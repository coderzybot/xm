<?php
include "lj.php";
 
if (isset($_GET['sid'])) {
    $sid = $_GET['sid'];
    $result = $conn->query("select * from xmtable where sid=$sid");
    echo json_encode($result->fetch_assoc());
}