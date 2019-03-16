<?php
$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
];

$db = new PDO($dsn, "root", "root", $options);

try{
    //只是将这个语句放到数据库上，编译后等待，没有执行
    $stmt = $db -> prepare('insert into myguests(firstname,lastname,email) values(?,?,?)');
    
    //执行存储在数据库中的语句
    $stmt -> execute(array('aaaa','1211bbbb2','a23123sd@qq.com'));
    echo 'success' . date("h:i:sa");
    
}catch(PDOException $e){
    echo $e->getMessage();
    exit();
}

///         数据添加成功  