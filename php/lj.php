<?php
// header( 'content-type:text/html;charset=utf-8' );
// define( 'LOCAL', 'localhost' );
// define( 'USERNAME', 'root' );
// define( 'PSW', '' );
// define( 'BG', 'sjk' );
header( 'content-type:text/html;charset=utf-8' );
define( 'LOCAL', 'b-xfxi8zrvwdl1ud.bch.rds.gz.baidubce.com:3306' );
define( 'USERNAME', 'b_xfxi8zrvwdl1ud' );
define( 'PSW', '1498954677' );
define( 'BG', 'b_xfxi8zrvwdl1ud' );
$conn = new mysqli( LOCAL, USERNAME, PSW, BG );
if ( $conn->connect_error ) {
    //如果连接有问题，自定义报错信息
    die( '数据库连接错误，请检查用户名和密码！' . $conn->connect_error );
}