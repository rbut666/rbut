<?php
class Person {
    public $name;
    public $age;
    public function do() {
        echo $this-> name . ' is working....' . PHP_EOL;
    }
}

// $ahui = new Person();
// $ahui -> name = '阿辉';
// echo $ahui-> do();

/// 抽象对象
// abstract class chouxiang_object {
//     abstract public function test();
// }

// class Son extends chouxiang_object {
//     public function test() {
//         echo "test success !";
//     }
// }

// $test = new Son();
// echo $test-> test();


// 接口
interface Iter {
    public function test();
}

class classT implements Iter {
    public function test(){
        echo "test success from interface";
    }
}

$test = new classT();
echo $test-> test();