<?php
// var_dump($_POST);

// $name = $_POST['username'];
// $pw = $_POST['password'];
// $email = $_POST['email'];
// $postData = file_get_contents('php://input');
// $requests = !empty($postData) ? json_decode($postData, true) : array();
// echo json_encode($postData);


// require_once './db_link.php';
// echo $username . '====' . $password . PHP_EOL;

// for update
$userid = $_POST['userid'];
$fName = $_POST['firstname'];
$lName = $_POST['lastname'];
$mail = $_POST['email'];


function update($id,$firstName, $lastName, $email) {
    $dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
    $db = new PDO($dsn, "root", "root");
    if($firstName) {
        $sql = "update myguests set firstname='$firstName' where id=". $id;
        $res=$db->exec($sql);
        echo '影响行数：' . $res;
    }
    if($lastName) {
        $sql = "update myguests set lastname='$lastName' where id=". $id;
        $res2=$db->exec($sql);
        echo '影响行数：' . $res2;
    }
    if($email) {
        $sql = "update myguests set email='$email' where id=". $id;
        $res3=$db->exec($sql);
        echo '影响行数：' . $res3;
    }
}
update($userid, $fName, $lName, $mail);