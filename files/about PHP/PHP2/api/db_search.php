<?php
// $servername = "localhost";
// $username = "root";
// $password = "root";
// $dbname = "myDB";
 
// $myPDOExample = new PDO("mysql:host=localhost;dbname=myDB","root","root");
// $sql = "SELECT * FROM myguests WHERE lastname='Moe' ;";
// $result = $myPDOExample::query($sql);

// $dataString = $resylt::fetch();
// echo $dataString;

$dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
$options = [
  PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
];
try {
  $pdo = new PDO($dsn, "root", "root", $options);
//   echo 'link success';
  $stmt = $pdo->prepare("SELECT * FROM myguests WHERE id <= ?");
    $stmt->execute([5]);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(!$arr) exit('No rows');
    var_export($arr);
    $stmt = null;
} catch (Exception $e) {
  error_log($e->getMessage());
  exit('Something weird happened'); //something a user can understand
}

// 查找成功