<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?=$this->title ?></title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="stylesheet" href="/assets_admin/css/bundle_admin.css">

	<script src="/assets_admin/js/ckeditor.js"></script>
	<script src="/ckfinder/ckfinder.js"></script>

<!--	<script type="text/javascript">-->
<!--		CKEDITOR_BASEPATH = '/ckeditor/';-->
<!--	</script>-->

	<script src="/assets_admin/js/bundle_admin.js"></script>

    <? if (PRODUCTION): ?>

    <!--[if lt IE 9]>
    <script src="/assets_admin/js/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

	<!-- Google Font -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
    <? endif; ?>

</head>
<body class="hold-transition skin-blue-light sidebar-mini" data-controller="<?=$CONTROLLER?>">

<div class="wrapper">

	<header class="main-header">
		<a href="/mngr" class="logo">
			<span class="logo-mini">ADM</span>
			<span class="logo-lg"><b>Admin</b> Panel</span>
		</a>
		<nav class="navbar navbar-static-top">
			<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
				<span class="sr-only">Toggle navigation</span>
			</a>

			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<li class="dropdown user user-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img src="/assets_admin/img/avatar.jpg" class="user-image" alt="User Image">
							<span class="hidden-xs"><?=App::getSession('name')?></span>
						</a>
						<ul class="dropdown-menu">
							<li class="user-header">
								<img src="/assets_admin/img/avatar.jpg" class="img-circle" alt="User Image">

								<p>
									<?=App::getSession('name')?>
									<small>Admin Panel</small>
								</p>
							</li>
							<li class="user-footer">
								<div class="pull-right">
									<a href="/" class="btn btn-default btn-flat js_logout">Выход</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>

	<aside class="main-sidebar">
		<section class="sidebar">
			<div class="user-panel">
				<div class="pull-left image">
					<img src="/assets_admin/img/avatar.jpg" class="img-circle" alt="User Image">
				</div>
				<div class="pull-left info">
					<p><?=App::getSession('name')?> <a href="/" class="btn btn-default btn-xs js_logout">Выход</a></p>
					<p><span class="text-blue"><?=date('H:i')?></span></p>
				</div>
			</div>
			<ul class="sidebar-menu js_side_menu" data-widget="tree">

				<li class="header">Affiliates</li>

                <li data-controller="affiliates">
                    <a href="<?=App::createUrl('/project')?>">
                        <i class="fa fa-gift"></i>
                        <span>Offers</span>
                    </a>
                </li>
                <li data-controller="affiliates">
                    <a href="<?=App::createUrl('/affiliates')?>">
                        <i class="fa fa-rocket"></i>
                        <span>Affiliates</span>
                    </a>
                </li>

                <li data-controller="withdraw">
                    <a href="<?=App::createUrl('/affiliatewithdraw')?>">
                        <i class="fa fa-certificate"></i>
                        <span>Withdrawal requests</span>
                    </a>
                </li>

                <li class="header">Manager</li>

                <li data-controller="account">
                    <a href="<?=App::createUrl('/account')?>">
                        <i class="fa fa-key"></i> <span>Account</span>
                    </a>
                </li>

				<? if (admin\model\Admin::getLevel() >= admin\model\Admin::$LEVEL_CALL_CENTER_SUPERVISOR): ?>

				<li class="header">Supervisor</li>

                <li data-controller="logs">
                    <a href="<?=App::createUrl('/logs')?>">
                        <i class="fa fa-list"></i> <span>Admin action log</span>
                    </a>
                </li>

                <li data-controller="admins">
                    <a href="<?=App::createUrl('/admins')?>">
                        <i class="fa fa-user"></i> <span>Admins</span>
                    </a>
                </li>

				<? endif; ?>

				<? if (admin\model\Admin::getLevel() == admin\model\Admin::$LEVEL_SUPERUSER): ?>

					<li class="header">Super user</li>

                    <li data-controller="assets">
                        <a href="<?=App::createUrl('/assets')?>">
                            <i class="fa fa-upload"></i> <span>Project assets</span>
                        </a>
                    </li>
					<li data-controller="preferences">
						<a href="<?=App::createUrl('/preferences')?>">
							<i class="fa fa-list-alt"></i> <span>Global variables</span>
						</a>
					</li>

				<? endif; ?>

			</ul>
		</section>
	</aside>

	<div class="content-wrapper">
		<?=$content?>
	</div>
</div>

<footer class="main-footer">
	<div class="pull-right hidden-xs">
		admin panel
	</div>
	<strong><?=APP_PUBLIC_NAME?> Ltd.</strong>
</footer>

</body>
</html>
