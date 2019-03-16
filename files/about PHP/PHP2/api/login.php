<?php
// var_dump($_POST);

$name = $_POST['username'];
$pw = $_POST['password'];
// $email = $_POST['email'];
// $postData = file_get_contents('php://input');
// $requests = !empty($postData) ? json_decode($postData, true) : array();
// echo json_encode($postData);

// echo $name . $pw .PHP_EOL;

// $sql="select * from buyer";
// $res=$pdo->query($sql);
// foreach($res as $row){
//  echo $row['username'].'<br/>';
// }

function searching($name){
    $dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
    $pdo = new PDO($dsn, "root", "root");
    $stmt = $pdo->prepare("SELECT * FROM myguests WHERE firstname = ?");

    $stmt->execute([$name]);
    $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if(!$arr) {
        exit("查无此人！");
    }else {
        echo "有这个人。。。";
        $stmt = null;
    }
}
searching($name);
/**
 * 密码加盐
 * 查找验证
 * 拒绝同名
 * 可切换用户名或邮箱登陆
 * 
 * token
 * 登陆状态  唯一
 */