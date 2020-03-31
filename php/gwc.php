<?php
include "lj.php";
$sql ="select * from xmtable";
$res=$conn->query($sql);
$arry =array();
for($i=0;$i<$res->num_rows;$i++){
    $arry[$i]=$res->fetch_assoc();
}
echo json_encode($arry);