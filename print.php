<?php
require_once 'db_config.php';
require_once "phpmailer/class.phpmailer.php";
DB::debugMode();
$i = 0;
//print_r($_REQUEST);
if (isset($_REQUEST['user'])) {

    $results = DB::query("SELECT * FROM `users` WHERE `client_name`=%s", $_REQUEST['user']);
    //print_r($results);
    if (count($results) == 1) {
        for (; array_key_exists('message' . $i, $_REQUEST); $i++) {
            if (isset($_REQUEST['message' . $i]) && strlen($_REQUEST['message' . $i]) > 1) {
                
                 DB::insertUpdate('client_error_stats_temp',array(
                'error_text'=>$_REQUEST['message'.$i],
                'file' =>$_REQUEST['url'.$i],
                'line_no'=>strlen($_REQUEST['line'.$i])>5?0:$_REQUEST['line'.$i],
                'client_id'=>$results[0]['id'],
                'hostname'=>$_REQUEST['page'.$i] ,
                'browser'=>$_REQUEST['browser'.$i] ,
                'total_error'=>'1',
                'last_reported' => DB::sqleval("NOW()" )),
                array('total_error' => DB::sqleval("total_error + 1" )
                ));
              $last_inserted_id=DB::insertId();
              DB::insert('client_error_temp', array('error_id'=> $last_inserted_id,'error_text' => $_REQUEST['message' . $i], 'stack_trace' => '', 'file' => $_REQUEST['page' . $i], 'line_no' => $_REQUEST['line' . $i], 'client_id' => $results[0]['id'], 'hostname' => $_REQUEST['url' . $i], 'ip' => $_SERVER['REMOTE_ADDR'], 'os' => $_REQUEST['os' . $i], 'browser' => $_REQUEST['browser' . $i], 'browser_version' => $_REQUEST['version' . $i], 'screen_size' => ''));
               
            }
        }//print_r($_REQUEST);
    }

}
?>
