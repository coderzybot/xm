<?php
include "lj.php";
if(isset($_POST['submit'])){
    $name=$_POST['name'];
    $psw=sha1($_POST['psw']);
    $phone=$_POST['phone'];
    $res=$conn->query("insert zc values(null,'$name','$psw','$phone')");
    header('location:http://coder.gz01.bdysite.com/projectname/src/html/enter.html');
};
if(isset($_POST['name'])){
    $uname=$_POST['name'];
    $res=$conn->query("select * from zc where name='$uname'");
    if($res->fetch_assoc()){
       echo true;
    }else{
        echo false;
    }
};
