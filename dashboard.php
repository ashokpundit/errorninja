<?php
require_once 'db_config.php';
if(isset($_REQUEST['user']))
{
	$name=$_REQUEST['user'];
	$results=DB::query("SELECT count(*) AS total,`error_text` from client_error  where `client_id`=%d group by `error_text` order by total desc LIMIT 0 , 3", $name);
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Dashboard Error Ninja</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="/bootstrap/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }

      @media (max-width: 980px) {
        /* Enable use of floated navbar text */
        .navbar-text.pull-right {
          float: none;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
    </style>
    <link href="/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="/bootstrap/js/html5shiv.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/bootstrap/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/bootstrap/ico/apple-touch-icon-114-precomposed.png">
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/bootstrap/ico/apple-touch-icon-72-precomposed.png">
                    <link rel="apple-touch-icon-precomposed" href="/bootstrap/ico/apple-touch-icon-57-precomposed.png">
                                   <link rel="shortcut icon" href="/bootstrap/ico/favicon.png">
  </head>

  <body>

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="brand" href="#">Error Ninja</a>
          <div class="nav-collapse collapse">
            <p class="navbar-text pull-right">
              Logged in as <a href="#" class="navbar-link"><?php echo $_REQUEST['user'] ?></a>
            </p>
            <ul class="nav">
              <li class="active"><a href="#">Dashboard</a></li>
              <li><a href="#about">Profile</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row-fluid">
        <div class="span3">
          <div class="well sidebar-nav">
            <ul class="nav nav-list">
              <li class="nav-header">Menu</li>
              <li class="active"><a href="#">Errors</a></li>
              <li><a href="#">Setting</a></li>
            </ul>
          </div><!--/.well -->
        </div><!--/span-->
        <div class="span9">
          <div class="hero-unit">
            <h1>{ Error Ninja }</h1>
          </div>
          <div class="row-fluid">
            <div class="span6">
              <h2>Errors Type</h2>
		<table class="table table-bordered table-hover table-condensed">
		<th> Error </th>
		<?php
		foreach ($results as $row) { 
		if (strlen($row['error_text']) > 1) {
		?>
		<tr><td><?php echo $row['error_text']?></td></tr>
		<?php
		}
		}
		?>
		</table>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div><!--/span-->
            <div class="span6">
              <h2>Top Errors</h2>
		<table class="table table-bordered table-hover table-condensed">
		<tr><th>Error</th><th>Error Count</th></tr>
              <?php
		foreach ($results as $row) { 
		if (strlen($row['error_text']) > 1) {
		?>
		<tr><td><?php echo $row['error_text']?></td><td><?php echo $row['total']?></td></tr>
		<?php
		}
		}
		?> 
		</table>
             <p><a class="btn" href="#">View details &raquo;</a></p>
            </div><!--/span-->
          </div><!--/row-->
          <div class="row-fluid">
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div><!--/span-->
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div><!--/span-->
            <div class="span4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn" href="#">View details &raquo;</a></p>
            </div><!--/span-->
          </div><!--/row-->
        </div><!--/span-->
      </div><!--/row-->

      <hr>

      <footer>
        <p>&copy; errorninja.com 2013</p>
      </footer>

    </div><!--/.fluid-container-->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/bootstrap/js/jquery.js"></script>
    <script src="/bootstrap/js/bootstrap-transition.js"></script>
    <script src="/bootstrap/js/bootstrap-alert.js"></script>
    <script src="/bootstrap/js/bootstrap-modal.js"></script>
    <script src="/bootstrap/js/bootstrap-dropdown.js"></script>
    <script src="/bootstrap/js/bootstrap-scrollspy.js"></script>
    <script src="/bootstrap/js/bootstrap-tab.js"></script>
    <script src="/bootstrap/js/bootstrap-tooltip.js"></script>
    <script src="/bootstrap/js/bootstrap-popover.js"></script>
    <script src="/bootstrap/js/bootstrap-button.js"></script>
    <script src="/bootstrap/js/bootstrap-collapse.js"></script>
    <script src="/bootstrap/js/bootstrap-carousel.js"></script>
    <script src="/bootstrap/js/bootstrap-typeahead.js"></script>
    <script src="/bootstrap/js/flot/jquery.flot.min.js"></script>
    <script src="/bootstrap/js/flot/jquery.flot.pie.min.js"></script>
    <script src="/bootstrap/js/flot/jquery.flot.resize.min.js"></script>

  </body>
</html>

