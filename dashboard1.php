<?php
session_start();
/*
 print_r($_SESSION);
 print_r($_REQUEST);*/

require_once 'db_config.php';
/*
 if(isset($_POST['email']) && isset($_POST['password']) && $_POST['email']!=='' && $_POST['password']!==''){
 $results_user=DB::query("select * from `users` WHERE `client_name`=%s  and `password`=%s", $_POST['email'],$_POST['password']);
 if(count($results_user)!=1){
 header("location:login.html");
 }else{
 if(count($results_user)==1) {
 $name=$_SESSION['userid']=$results_user[0]['id'];
 $_SESSION['username']=$results_user[0]['client_name'];
 }
 else{
 header("location:login.html");
 }
 }
 }
 else */
if (isset($_SESSION['userid'])) {
	$name = $_SESSION['userid'];

} else {
	header("location:/");
}
/*$results=DB::query("SELECT count(*) AS total,`error_text`, DATE(`timestamp`) as date FROM `client_error` WHERE `client_id`=%d GROUP BY DATE(`timestamp`) order by total desc", $name);
 $results_top=DB::query("SELECT count(*) AS total,`error_text` from client_error_stats  where `client_id`=%d  group by `error_text` order by total desc", $name);
 $results_file=DB::query("SELECT count(*) AS total, `file` from client_error_stats  where `client_id`=%d group by `file`  order by total desc", $name);*/
$results_lines = DB::query("SELECT total_error AS total, `error_text`, `line_no`, file, browser, last_reported,id FROM `client_error_stats_temp` where `client_id`=%d order by last_reported desc limit 0,500 ", $name);
$results_user = DB::query("SELECT * FROM `users` WHERE `id`=%i", $_SESSION['userid']);
if (count($results_user) != 1) {
	echo "User id not vaild";
	exit();
}
?>
<!DOCTYPE html>
<html >

	<head>
		<title>Dashboard</title>
		<!-- Bootstrap -->
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
		<link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
		<link href="vendors/easypiechart/jquery.easy-pie-chart.css" rel="stylesheet" media="screen">
		<link href="assets/styles.css" rel="stylesheet" media="screen">
		<link href="assets/DT_bootstrap.css" rel="stylesheet" media="screen">
		<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
		<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script src="vendors/modernizr-2.6.2-respond-1.1.0.min.js"></script>
	</head>

	<body>
		<div class="navbar navbar-fixed-top">
			<div class="navbar-inner navbar-inner-black">
				<div class="container-fluid">
					<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </a>
					<a class="brand" href="#">Error Ninja</a>
					<div class="nav-collapse collapse">
						<ul class="nav pull-right">
							<li class="dropdown">
								<a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown"> <i class="icon-user icon-white"></i> <?php if(count($results_user)==1) echo $results_user[0]['client_name'] ?> <i class="caret"></i> </a>
								<ul class="dropdown-menu">

									<li>
										<a tabindex="-1" href="logout.php">Logout</a>
									</li>
								</ul>
							</li>
						</ul>
						<ul class="nav">
							<li class="active">
								<a href="/dashboard1.php">Dashboard</a>
							</li>
						</ul>
					</div>
					<!--/.nav-collapse -->
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="row-fluid">
				<!--div class="span3" id="sidebar">
					<ul class="nav nav-list bs-docs-sidenav nav-collapse collapse">
						<li class="active">
							<a href="index.html"><i class="icon-chevron-right"></i> Dashboard</a>
						</li>
						<li>
							<a href="#"><i class="icon-chevron-right"></i> Settings</a>
						</li>

					</ul>
				</div-->

				<!--/span-->
				<div class="span12" id="content">
					<!--div class="row-fluid">
						<div class="navbar">
							<div class="navbar-inner">
								<ul class="breadcrumb">
									<i class="icon-chevron-left hide-sidebar"><a href='#' title="Hide Sidebar" rel='tooltip'>&nbsp;</a></i>
									<i class="icon-chevron-right show-sidebar" style="display:none;"><a href='#' title="Show Sidebar" rel='tooltip'>&nbsp;</a></i>
									<li class="active">
										<a href="./index.html">Dashboard</a>
									</li>
								</ul>
							</div>
						</div>
					</div-->
					<!-- morris stacked chart -->
                    <!--div class="row-fluid">
                        
                        <div class="block">
                            <div class="navbar navbar-inner block-header">
                                <div class="muted pull-left">Errors by date</div>
                                <div class="pull-right"><span class="badge badge-warning">View More</span>

                                </div>
                            </div>
                            <div class="block-content collapse in">
                                <div class="span12">
                                    <div id="hero-area" style="height: 250px;"></div>
                                </div>
                            </div>
                        </div>
                        
                    </div-->

					<!-- morris bar & donut charts -->
                    <!--div class="row-fluid section">
                        
                        <div class="block">
                            <div class="navbar navbar-inner block-header">
                                <div class="muted pull-left">Java Script Errors</div>
                                <div class="pull-right"><span class="badge badge-warning">View More</span>

                                </div>
                            </div>
                            <div class="block-content collapse in">
                                <div class="span6 chart">
                                    <h5>Type of Errors</h5>
                                    <div id="hero-donut-type" style="height: 250px;"></div>
                                </div>
                                <div class="span6 chart">
                                    <h5>Top Errors</h5>
                                    <div id="hero-donut-top" style="height: 250px;"></div>    
                                </div>
                            </div>
                        </div>
                        
                    </div-->
                    
                    
                     <div class="row-fluid">
                        <!-- block -->
                        <div class="block">
                            <div class="navbar navbar-inner block-header">
                                <div class="muted pull-left">Error Details</div>
                            </div>
                            <div class="block-content collapse in">
                                <div class="span12">
  									<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
										<thead>
											<tr>
												<!--th>Sr.No</th-->
												<th>Error</th>
												<th>File</th>
												<th>Line</th>
												<th>Count</th>
												<th>Browser</th>
                                                                                                <th>Time</th>
											</tr>
										</thead>
										<tbody>
											<?php $i=1; foreach ($results_lines as $row) {
											if (strlen($row['error_text']) > 1) {
												?>
											<tr class="odd gradeX">
												<!--td>
                                                                                                    <?php /*echo $i;
												$i = $i + 1;*/
											?>
                                                                                                </td-->
												<td><a href="/error.php?id=<?php echo $row['id']?>"><?php echo $row['error_text']; ?></a></td>
												<td><?php echo $row['file']; ?></td>
												<td class="center"><?php echo $row['line_no']>99999?0:$row['line_no']; ?></td>
												<td class="center"><?php echo $row['total']; ?></td>
												<td class="center"><?php echo $row['browser']; ?></td>
                                                <td class="center"><?php $timestamp = $row['last_reported'];
                                                $date = new DateTime($timestamp);
												$date->setTimezone(new DateTimeZone('Asia/Calcutta')); 
                                                echo $date->format('Y-m-d H:i:s');?>
                                                </td>
                                                                                                
											</tr>
											<?php
											}
											}
											?>
										</tbody>
									</table>
                                </div>
                            </div>
                        </div>
                        <!-- /block -->
                    </div>


				</div>
			</div>
			<hr>
			<footer>
				<p>
					&copy; Error Ninja 2013
				</p>
			</footer>
		</div>
		<!--/.fluid-container-->
		<link rel="stylesheet" href="vendors/morris/morris.css">
		<script src="vendors/jquery-1.9.1.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="vendors/easypiechart/jquery.easy-pie-chart.js"></script>
		<script src="vendors/morris/morris.min.js"></script>

        <script src="vendors/jquery.knob.js"></script>
        <script src="vendors/raphael-min.js"></script>
        <script src="vendors/morris/morris.min.js"></script>

        <script src="vendors/flot/jquery.flot.js"></script>
        <script src="vendors/flot/jquery.flot.categories.js"></script>
        <script src="vendors/flot/jquery.flot.pie.js"></script>
        <script src="vendors/flot/jquery.flot.time.js"></script>
        <script src="vendors/flot/jquery.flot.stack.js"></script>
        <script src="vendors/flot/jquery.flot.resize.js"></script>

		<script src="vendors/datatables/js/jquery.dataTables.min.js"></script>
		
		<script src="assets/scripts.js"></script>
		<script src="assets/DT_bootstrap.js"></script>
		<script>
			
			 			// Morris Area Chart
        Morris.Area({
            element: 'hero-area',
            data: [<?php
		foreach ($results as $row) { ?>
                			{date: '<?php echo $row['date']?>', js:<?php echo $row['total']?>
			, php: null, java: null},
               <?php } ?>
            				],
            xkey: 'date',
            ykeys: ['js', 'php', 'java'],
            labels: ['Java Script', 'PHP', 'java'],
            lineWidth: 2,
            hideHover: 'auto',
            lineColors: ["#81d5d9", "#a6e182", "#67bdf8"]
          });
          
          // Morris Donut Chart
        Morris.Donut({
            element: 'hero-donut-type',
            data: [<?php
        $total_error=0;
		foreach ($results_top as $row ) {
			if (strlen($row['error_text']) > 1)
			$total_error+=$row['total'];
		}    
		foreach ($results_top as $row) {
			if (strlen($row['error_text']) > 1) { ?>
                				{label: "<?php echo $row['error_text']; ?>", value:<?php $val = ($row['total'] / $total_error) * 100;
				echo number_format($val, 2);
			?>
				},
                <?php }
					}
				?>
            					],
            colors: ["#30a1ec", "#76bdee", "#c4dafe"],
            formatter: function (y) { return y + "%" }
        });
        
        // Morris Donut Chart
        Morris.Donut({
            element: 'hero-donut-top',
            data: [<?php
        $total_error=0;
		foreach ($results_file as $row ) {
		
			$total_error+=$row['total'];
		}    
		foreach ($results_file as $row) {
			 ?>
                				{label: '<?php echo $row['file']; ?>', value:<?php $val = ($row['total'] / $total_error) * 100;
				echo number_format($val, 2);
			?>
				},
                <?php
					}
				?>
					], colors: ["#30a1ec", "#76bdee", "#c4dafe"],
					formatter: function(y) {
						return y + "%"
					}
					});
		</script>
	</body>

</html>
