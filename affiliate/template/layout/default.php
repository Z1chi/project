<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Affiliate Panel</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="/assets_affiliate/css/bundle_affiliate.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css"/>
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!--	<script type="text/javascript">-->
    <!--		CKEDITOR_BASEPATH = '/ckeditor/';-->
    <!--	</script>-->

    <script src="/assets_affiliate/js/bundle_affiliate.js"></script>

    <!-- Google Font -->
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition skin-blue sidebar-mini" data-controller="<?= $CONTROLLER ?>">

<div class="wrapper">

    <header class="main-header">
        <a href="<?= App::createUrl('') ?>" class="logo">
            <span class="logo-mini">AFF</span>
            <span class="logo-lg"><b>Affiliate</b> Panel</span>
        </a>
        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>

            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="/assets_affiliate/img/avatar.jpg" class="user-image" alt="User Image">
                            <span class="hidden-xs"><?= App::getSession('name') ?></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="user-header">
                                <img src="/assets_affiliate/img/avatar.jpg" class="img-circle" alt="User Image">

                                <p>
                                    <?= App::getSession('name') ?>
                                    <small>Affiliate Panel</small>
                                </p>
                            </li>
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a href="/" class="btn btn-default btn-flat js_logout">Sign out</a>
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
            <a href="<?= App::createUrl('/profile') ?>">
                <div class="user-panel">
                    <div class="pull-left image">
                        <img src="/assets_affiliate/img/avatar.jpg" class="img-circle" alt="User Image">
                    </div>
                    <div class="pull-left info">
                        <p><?= App::getSession('name') ?></p>
                        <span><?= App::getSession('email') ?></span>
                    </div>
                </div>
            </a>
			<ul class="sidebar-menu js_side_menu" data-widget="tree">
				<li class="header">Menu</li>

                <li>
                    <a href="<?= App::createUrl('/home') ?>">
                        <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                    </a>
                </li>

                <li>
                    <a href="<?= App::createUrl('/project') ?>">
                        <i class="fa fa-info"></i> <span>Offer</span>
                    </a>
                </li>

                <?php if (false): ?>
                    <li>
                        <a href="<?= App::createUrl('/leads') ?>">
                            <i class="fa fa-users"></i> <span>Leads</span>
                        </a>
                    </li>
                <?php endif; ?>

                <li>
                    <a href="<?= App::createUrl('/actionlog') ?>">
                        <i class="fa fa-list"></i> <span>Action log</span>
                    </a>
                </li>

                <li>
                    <a href="<?= App::createUrl('/smartlinks') ?>">
                        <i class="fa fa-link"></i> <span>Smartlinks</span>
                    </a>
                </li>

                <li>
                    <a href="<?= App::createUrl('/withdraw') ?>">
                        <i class="fa fa-money"></i> <span>Withdraw</span>
                    </a>
                </li>
                <li>
                    <a href="<?= App::createUrl('/statistic') ?>">
                        <i class="fa fa-bar-chart"></i> <span>Statistic</span>
                    </a>
                </li>
                <li>
                    <a href="<?=App::createUrl('/help')?>">
                        <i class="fa fa-question"></i> <span>FAQ</span>
                    </a>
                </li>
				<li class="header">Contacts</li>

                <li>
                    <a href="mailto:<?= App::getVar('telegram_affiliate_email') ?>">
                        <i class="fa fa-envelope"></i> <span><?= App::getVar('telegram_affiliate_email') ?></span>
                    </a>
                </li>

                <li>
                    <a href="<?= App::getVar('telegram_affiliate_group') ?>" target="_blank">
                        <i class="fa fa-group"></i> <span>Telegram Chat</span>
                    </a>
                </li>
                <li>
                    <div>
                        <label style="text-align: center;width: 100%;color: #b8c7ce;margin-top: 30px;">You personal manager</label>
                        <div style="display: flex; justify-content: space-evenly;">
                            <a href="<?= App::getSession('support_tg_link') ?>" style=" display: block">
                                <img src="/assets_affiliate/img/telegram-icon.svg" alt="telegram link">
                            </a>
                            <div style="display: flex; margin: auto 0">
                                <img style="width: 55px" src="<?= App::getSession('support_image') ?>" alt="manager avatar">
                            </div>
                        </div>
                    </div>
                </li>

            </ul>
        </section>
    </aside>

    <div class="content-wrapper">
        <?= $content ?>
    </div>
</div>

<footer class="main-footer">
    <div class="pull-right hidden-xs">
        affiliate panel
    </div>
    <strong><?= APP_PUBLIC_NAME ?> Ltd.</strong>
</footer>

</body>
</html>
