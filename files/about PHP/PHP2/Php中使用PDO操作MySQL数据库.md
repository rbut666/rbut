# Php中使用PDO操作MySQL数据库(查询 更新 删除)

> PDO是mysql数据库操作的一个公用类了，我们不需要进行自定类就可以直接使用pdo来操作数据库了，但是在php默认配置中pdo是未开启所以我们必须先在php.ini中开启它才可以使用，下文我会讲到。
> PDO扩展为PHP访问数据库定义了一个轻量级的、一致性的接口，它提供了一个数据访问抽象层，
> 这样，无论使用什么数据库，都可以通过一致的函数执行查询和获取数据。

> PDO支持的PHP版本为PHP5.1以及更高的版本,而且在PHP5.2下PDO默认为开启状态,
> 下面是在php.ini中PDO的配置:

```ini
extension=php_pdo.dll
```

> 为了启用对某个数据库的支持,需要在php配置文件中将相应的扩展打开,例如要支持MySQL,需要开启下面的扩展

```ini
extension=php_pdo_mysql.dll
```

> 这里是使用PDO对mysql进行基本的增删改查操作

``` php
header("content-type:text/html;charset=utf-8");
$dsn="mysql:dbname=test;host=localhost";
$db_user='root';
$db_pass='admin';
try{
 $pdo=new PDO($dsn,$db_user,$db_pass);
}catch(PDOException $e){
 echo '数据库连接失败'.$e->getMessage();
}
//新增
$sql="insert into buyer (username,password,email) values ('ff','123456','admin@admin.com')";
$res=$pdo->exec($sql);
echo '影响行数：'.$res;
 
//修改
$sql="update buyer set username='ff123' where id>3";
$res=$pdo->exec($sql);
echo '影响行数：'.$res;
//查询
$sql="select * from buyer";
$res=$pdo->query($sql);
foreach($res as $row){
 echo $row['username'].'<br/>';
}
//删除
$sql="delete from buyer where id>5";
$res=$pdo->exec($sql);
echo '影响行数：'.$res;
```

### https://www.cnblogs.com/tinywan/p/6143889.html
### https://segmentfault.com/q/1010000008581737


### [php redis session](https://yann0917.github.io/2017/05/01/PHP-session-%E5%AD%98%E5%85%A5-Redis/)

### [PHP密码加密1](http://wiki.jikexueyuan.com/project/php-best-practices/store-password.html) [php加密](https://blog.csdn.net/change_any_time/article/details/79555624)

``` php
// 密码 $code
$code = '12dsajdk';
// 将密码加盐
$hash = password_hash($code, PASSWORD_DEFAULT);
echo $hash . PHP_EOL;
if (password_verify('rasmuslerdorf', $hash)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}
```