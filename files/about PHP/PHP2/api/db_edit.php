<?php
$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";

try{
    $db = new PDO($dsn, "root", "root");
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo 'Connection failed: ' . $e->getMessage();
}

// 给id为 4的 修改 firstname 为edited
$id = 4;
$name = 'edited';

// $sql = "update myguests set firstname= " . $name ."where id=". $id;
$sql = "update myguests set firstname='$name' where id=". $id;

$res=$db->exec($sql);
echo '影响行数：' . $res;

///// 修改成功