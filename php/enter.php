<?php
include "lj.php";
if ($_POST['name'] && $_POST['psw']) {
    $uname = $_POST['name'];
    $psw = $_POST['psw'];
    $res = $conn->query("select * from zc where name='$uname'and pas='$psw'");
    if ($res->fetch_assoc()) {
        echo true;
    } else {
        echo false;
    }
}
