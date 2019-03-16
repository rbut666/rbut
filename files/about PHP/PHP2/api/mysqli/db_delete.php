<?php
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "myDB";
 
// $con=mysqli_connect($servername,$username,$password,$dbname);
// // 检测连接
// if (mysqli_connect_errno())
// {
//     echo "连接失败: " . mysqli_connect_error();
// }

// mysqli_query($con,"DELETE FROM Persons WHERE LastName='Moe'");

// mysqli_close($con);


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

mysqli_query("DELETE FROM MyGuest WHERE firstname='John'");

mysqli_close($conn);
