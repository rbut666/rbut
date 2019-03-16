<?php
$name = $_GET['name'];
$age = $_GET['age'];
// $msg =  '用户名：'.$name.',年龄：'.$age;
$arr = Array('name'=> $name, 'age'=> $age);
// include('init.php');
// include("link.php");
// include('write_data.php');
$num = 1232;
$bool = true;
// define("CONST", 1213124);
// echo is_bool($bool) .PHP_EOL;
// echo gettype("CONST") .PHP_EOL;
// echo gettype($msg) .PHP_EOL;
// ech
// echo json_encode($arr);

// test function
function test(array $a, bool $b) {
    $arr2 = Array('islady'=> $b);
    echo json_encode(array_merge($a, $arr2))  .PHP_EOL;
}

test($arr, $bool);


// class object

class Person {
    public $qw;
    public $age;
    public $pb = 'aaaaaaaaaa';
    protected $hair = '我是谁、。。。。';
    private $selfs = '我是有节操的';
    public function say() {
        echo 'hello ' . $this -> qw . ', 现在' . $this -> age . '点钟' . PHP_EOL;
    }
    public function water() {
        echo '受保护的属性$hair' . $this-> hair .PHP_EOL;
    }
    public function getSelfValue() {
        echo '只能自己用的属性$selfs' . $this-> selfs .PHP_EOL;
    }
    public function getParentValue() {
        echo self::$pb . PHP_EOL;
    }
}
// echo Person::class .PHP_EOL;
$ahui = new Person();
$ahui -> qw = '阿辉';
$ahui -> age = 15;

echo $ahui->say($ahui -> qw) .PHP_EOL;
echo $ahui -> getSelfValue();

// extends
class men extends Person {
    public function act() {
        echo $this -> qw . 'is working...' . PHP_EOL;
    }
}

$xiaoxixi = new men();
$xiaoxixi -> qw = 'xiaoxixi';
$xiaoxixi -> age = 11;
// $xiaoxixi -> hair = '想换一下 受保护的属性'; // 报错 
// $xiaoxixi -> selfs = '想换一下私有属性'; // 不能替换
echo $xiaoxixi -> act();
echo $xiaoxixi -> say();
echo $xiaoxixi -> water();
echo $xiaoxixi -> getSelfValue();
echo $xiaoxixi -> getParentValue();