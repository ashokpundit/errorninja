<?php
require_once 'db_config.php';
$variables=array('sender-name'=>'Your Name',
				 'sender-email'=>'Your email',
				 'sender-company-name'=>'Your Company Name',
				 'sender-company-url'=>'Your Company URL'				
				);
$error_message='';
foreach ($variable as $key => $value) {
	if(!isset($_POST[$key]) && empty($_POST[$key])){
		$error_message.=$value.' ';
	}
}
if(!empty($error_message)){
	echo "failure||".$error_message. " is missing"; 
	die();
}
$name=$_POST['sender-name'];
$email=$_POST['sender-email'];
$company_name=$_POST['sender-company-name'];
$company_url=$_POST['sender-company-url'];
$message=$_POST['message'];
if (!preg_match("/^[a-zA-Z ]*$/",$name))
{
      $error_message = "Only letters and white space allowed "; 
}
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email))
{
      $error_message .= "Invalid email format "; 
}
if (!preg_match("/\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i",$company_url))
{
      $error_message .= "Invalid URL"; 
}
if(!empty($error_message)){
	echo "failure||".$error_message; 
	die();
}
if (count($_POST) > 0) {
	if (isset($_POST['sender-email']) && $_POST['sender-email'] !== '') {
		$results_user = DB::query("select * from `users` WHERE `email`=%s ", $_POST['sender-email']);
		if (count($results_user) == 1) {
			echo "failure";
			die();
		} else {
			DB::insert('users',array(
				'client_name'=>$name,
				'email' =>$email,
				'company_name'=>$company_name,
				'company_url'=>$company_url,
				'is_activated'=>0
				));
				echo "success";
				die();
		}
	}
}
?>
