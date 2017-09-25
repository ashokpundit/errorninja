<?php
require_once 'db_config.php';
	$array_error_text=array("Syntax error",
			"Expected (",
			"Missing { before function body",
			"Missing ; after for-loop condition",
			"Unterminated string constant",
			"A script on this page is causing Internet Explorer to run slowly… Do you want to abort the script?",
			"X is not an object",
			"X is not defined",
			"ReferenceError: COMSCORE is not defined",
			"TypeError: $.browser is undefined",
			"Null pointer error"
			);
	$array_file=array("users.js",
			"dashboard.js",
			"temp.js",
			"random.js",
			"ikhan.js",
			"home.js",
			"songs.js",
			"assets.js"
	);
	$array_os=array(	"Windows",
				"Mac",
				"Linux",
				"iPad",
				"Android"
				);
	$array_browser=array(
				"Chrome",
				"Firefox",
				"Safari",
				"Netscape",
				"Internet Explorer",
				"Opera",
				"Gecko"
				);
	$array_client=array(
				10
				);



for($i=0;$i<=4000;$i++)
{
	$j=rand(0, count($array_error_text)-1);
	$error_text=$array_error_text[$j];
	$j=rand(0, count($array_file)-1);
	$file=$array_file[$j];
	$j=rand(0, count($array_browser)-1);
	$browser=$array_browser[$j];
	$j=rand(0, count($array_os)-1);
	$os=$array_os[$j];
	//$j=rand(0, count($array_client)-1);
	$client=$array_client[0];
	$line_no=rand(100, 105);
	$browser_version=rand(1, 25);
	$hostname="ikhan.com";
    $ip="10.0.0.1";
	/*
	DB::insert('client_error',array(
			'error_text'=>$error_text,
			'stack_trace'=>'',
			'file' =>$file,
			'line_no'=>$line_no,
			'client_id'=>$client,
			'hostname'=>$file ,
			'ip'=>'' ,
			'os'=>$os ,
			'browser'=>$browser ,
			'browser_version'=>$browser_version ,
			'screen_size'=>''));*/
	
          DB::insertUpdate('client_error_stats_temp',array(
                'error_text'=>$error_text,
                'file' =>$file,
                'line_no'=>$line_no,
                'client_id'=>$client,
                'hostname'=>$hostname,
                'browser'=>$browser ,
                'total_error'=>'1',
                'last_reported' => DB::sqleval("NOW()" )),
                array('total_error' => DB::sqleval("total_error + 1" )
                ));
          $last_inserted_id=DB::insertId();
          DB::insert('client_error_temp', array('error_id'=> $last_inserted_id,'error_text' => $error_text, 'stack_trace' => '', 'file' => $file, 'line_no' => $line_no, 'client_id' => $client, 'hostname' => $hostname, 'ip' => $ip, 'os' => $os, 'browser' =>$browser, 'browser_version' => $browser_version, 'screen_size' => ''));
}
/*

$count_error_text = DB::queryOneField('count', "SELECT count(*) as count  FROM client_error");
echo "total rows in client_error \t".$count_error_text."\n";
$MAX_ROWS=1000;
$limit_start=0;
$limit_rows=$MAX_ROWS;
$total_page=intval($count_error_text%$MAX_ROWS==0?$count_error_text/$MAX_ROWS:($count_error_text/$MAX_ROWS)+1);
echo $total_page;

for($i=0;$i<$total_page;$i++){
	$results_client_error=DB::query("SELECT * FROM client_error limit %i,%i",$i*$MAX_ROWS,$MAX_ROWS);
	foreach($results_client_error as $row){
		// check same error are available in client_error_stats
			$results_count_error=DB::queryOneField("count","select count(*) as count from client_error_stats where file=%s and line_no=%i and client_id=%i and browser=%s",$row['hostname'],$row['line_no'],$row['client_id'],$row['browser']);
			if($results_count_error==0){
				// if this error is not reported in client_error_stas table 
				// insert new row				
				DB::insert('client_error_stats',array(
				'error_text'=>$row['error_text'],
				'file' =>$row['hostname'],
				'line_no'=>$row['line_no'],
				'client_id'=>$row['client_id'],
				'hostname'=>$row['file'] ,
				'browser'=>$row['browser'] ,
				'total_error'=>'1',
				'last_reported' => DB::sqleval("NOW()")));
			}else{
				// if this error is already reported in client_error_stats
				// get count value
				$results_total_error=DB::queryOneField("count","select total_error as count from client_error_stats where file=%s and line_no=%i and client_id=%i and browser=%s",$row['hostname'],$row['line_no'],$row['client_id'],$row['browser']);
				DB::update('client_error_stats',array(
				'total_error'=>$results_total_error+1
				),"file=%s and line_no=%i and client_id=%i and browser=%s",$row['hostname'],$row['line_no'],$row['client_id'],$row['browser']);
			}
	}	
}
*/
 
?>
