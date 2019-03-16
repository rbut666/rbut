<?php
$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
// $options = [
//   PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
//   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
//   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
// ];

try{
    $db = new PDO($dsn, "root", "root");
    $db -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    echo 'Connection failed: ' . $e->getMessage();
}

// try{
//     // 插入数据
//     $stmt = $db -> prepare('insert into myguests(firstname,lastname,email) values(?,?,?)');
//     $stmt -> execute(array('wtao','23232','sa32@gmail.com'));
//     $count = $stmt -> rowCount();
//     if($count === 0){
//         throw new PDOException();
//     }
    
//     $id = $db -> lastInsertId();
//     echo '处理结束 ：' . $id;
// }catch(PDOException $e){
//     echo 'Connection failed: ' . $e->getMessage();
// }

$id = 13;
$sql = "delete from myguests where id =" . $id;
$res = $db->exec($sql);
echo "影响行数：" .$res;

$sear="select * from myguests";
$reser=$db->query($sear);
foreach($reser as $rows){
 echo $rows['username'].'<br/>';
}

/////////   删除成功