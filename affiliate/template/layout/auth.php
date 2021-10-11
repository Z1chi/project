<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Affiliate</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<link rel="stylesheet" href="/assets_affiliate/css/bundle_affiliate.css">

	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<script src="/assets_affiliate/js/bundle_affiliate.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition login-page" data-controller="<?=$CONTROLLER?>">
<? if ($PAGE == 'signup'): ?>
<div class="register-box">
	<div class="register-box-body">
		<form method="POST" class="js_signup_form">
			<div class="form-group has-feedback">
				<input name="first_name" type="text" class="form-control" placeholder="First name">
				<span class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input name="last_name" type="text" class="form-control" placeholder="Last name">
				<span class="glyphicon glyphicon-user form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input name="email" type="email" class="form-control" placeholder="Email">
				<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input name="telegram" type="text" class="form-control" placeholder="Telegram">
				<span class="glyphicon glyphicon-phone form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input name="password" type="password" class="form-control" placeholder="Password">
				<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input name="password_repeat" type="password" class="form-control" placeholder="Retype password">
				<span class="glyphicon glyphicon-log-in form-control-feedback"></span>
			</div>
			<div class="row">
				<div class="col-xs-6">
					<button type="submit" class="btn btn-primary btn-block btn-flat">Create account</button>
				</div>
				<div class="col-xs-6 js_signup_message"></div>
			</div>
		</form>

	</div>
	<!-- /.form-box -->
</div>
<!-- /.register-box -->
<?php elseif($PAGE == 'forgot'): ?>
    <h1>Hello Forgot</h1>
<?php elseif($PAGE == 'recovery'): ?>
    <h1>Hello Recovery</h1>
<? elseif(empty($PAGE)): ?>
<div class="login-box">
	<div class="login-box-body">
		<form method="post" class="js_auth_form">
			<input type="hidden" name="token" value="<?= $token ?>">
			<div class="form-group has-feedback">
				<input type="text" name="username" class="form-control" placeholder="Username">
				<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
			</div>
			<div class="form-group has-feedback">
				<input type="password" name="password" class="form-control" placeholder="Password">
				<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			</div>
            <div class="row">
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary btn-block btn-flat">Sign in</button>
                </div>
                <div class="col-xs-8 js_auth_message"></div>
            </div>
            <br>
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        <a class="btn btn-default btn-block btn-flat" href="<?=App::createRawUrl('/?start=signup')?>">Signup</a>
                        <a class="btn btn-default btn-block btn-flat" href="<?=App::createRawUrl('/?start=forgot')?>">Forgot password</a>
                    </p>
                </div>
            </div>
		</form>
	</div>
</div>
<? endif; ?>
</body>
</html>
