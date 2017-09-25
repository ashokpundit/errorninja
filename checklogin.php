<?php
session_start();
require_once 'db_config.php';
if (count($_POST) > 0) {
	if (isset($_POST['email']) && isset($_POST['password']) && $_POST['email'] !== '' && $_POST['password'] !== '') {
		$results_user = DB::query("select * from `users` WHERE `client_name`=%s  and `password`=%s and is_activated=1", $_POST['email'], md5($_POST['password']));
		print_r($results_user);
		if (count($results_user) == 1) {
			$_SESSION['userid'] = $results_user[0]['id'];
			$_SESSION['username'] = $results_user[0]['client_name'];
			header("HTTP/1.1 303 See Other");
			header("Location: http://".$_SERVER[HTTP_HOST]."/dashboard1.php");
			die();
		} else {
			header("location:login.html");
		}
	}
}
?>