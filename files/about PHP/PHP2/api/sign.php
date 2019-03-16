<?php
// var_dump($_POST);

$name = $_POST['username'];
$pw = $_POST['password'];
$email = $_POST['email'];
// $postData = file_get_contents('php://input');
// $requests = !empty($postData) ? json_decode($postData, true) : array();
// echo json_encode($postData);


// require_once './db_link.php';
// echo $username . '====' . $password . PHP_EOL;

class dbADD
{
    public $dsn = "mysql:host=localhost;dbname=mydb;charset=utf8mb4";
    public $options= [
        PDO::ATTR_EMULATE_PREPARES   => false, // turn off emulation mode for "real" prepared statements
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, //make the default fetch be an associative array
    ];
    public $person;

    public function add() {
        $db = new PDO($this-> dsn, "root", "root", $this-> options);
        try{
            $stmt = $db -> prepare('insert into myguests(firstname,lastname,email) values(?,?,?)');
            $stmt -> execute($this-> person);
            echo "注册成功" . date("h:i:sa");
        }catch (PDOException $e) {
            echo $e ->getMessage();
            exit();
        }
    }
    public function search() {
        try {
            $db = new PDO($this-> dsn, "root", "root", $this-> options);
            $stmt = $db->prepare("SELECT * FROM myguests WHERE id >= ?");
            $stmt->execute([1]);
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if(!$arr) exit('No rows');
            // var_export($arr);
            echo json_encode ( $arr, JSON_FORCE_OBJECT );
            $stmt = null;
          } catch (Exception $e) {
            error_log($e->getMessage());
            exit('Something weird happened'); //something a user can understand
          }
    }
    public function beforeSign($name) {
        try {
            $db = new PDO($this-> dsn, "root", "root", $this-> options);
            $stmt = $db->prepare("SELECT * FROM myguests WHERE firstname = ?");
            $stmt->execute([$name]);
            $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($arr) {
                echo "该用户已注册";
            }else {
                $this-> add();
            }
            $stmt = null;
          } catch (Exception $e) {
            error_log($e->getMessage());
            exit('Something weird happened'); //something a user can understand
          }
    }
}

$newperson = array($name, $pw, $email);
// echo json_encode($newperson);
$addPerson = new dbADD();
$addPerson -> person = $newperson;

$addPerson -> beforeSign($name);
// $addPerson -> add();

// $addPerson -> search();