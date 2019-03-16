<?php
/**
 * this self 区别
 * 使用$this来指代当前对象。用self指当前类。换句话说，  
 * $this->member用于非静态成员，self::$member用于静态成员。
 */
class AAA {
    private static $a = 'aaa';
    public static $b = 'static';
    public function show() {
        echo self::$a;
        echo self::$b;
    }
}

$child = new AAA();
// $child -> a = 'first';

$child -> show(); // first static