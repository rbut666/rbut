<?php
$servername = "localhost";
$username = "root";
$password = "root";
 
// 创建连接
$conn = new mysqli($servername, $username, $password);
 
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}else {
    $query = "SELECT * FROM class";
    // echo $query;
    
}
echo "连接成功" .PHP_EOL;

// https://segmentfault.com/a/1190000013179595
// 初始化数据库  写入名为 abc 的表
// $con = mysql_connect("localhost","justset","123456");
// mysql_select_db("justset", $con);
// $sql = "CREATE TABLE abc(
//     id int NOT NULL AUTO_INCREMENT,
//     PRIMARY KEY(id),
//     openid varchar(32),
//     nickname varchar(32),
//     sex varchar(8)
// )";
// mysql_query($sql, $con);
// mysql_close($con)

// write

?>