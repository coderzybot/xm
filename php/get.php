<?php
include "lj.php";
$sql ="select * from xmtable";
$result =$conn->query($sql);
$arr =array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}
echo json_encode($arr);