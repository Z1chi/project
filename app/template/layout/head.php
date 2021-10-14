<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="robots" content="index, follow">
    <meta name="google" content="notranslate">
    <meta name="format-detection" content="telephone=no">
    <meta name="keywords" content="">
    <meta property="og:site_name" content="">
    <meta property="og:title" content="">
    <meta property="og:description" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:image" content="">

    <title><?= $this->title ?></title>
    <link rel="preload" href="/assets/js/bundle.js?<?= $MTIME_JS ?>" as="script">
    <link rel="shortcut icon" href="/assets/img/trafburg-ico.png" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet">


    <link rel="stylesheet" href="/assets/css/bundle.css?<?= $MTIME_CSS ?>">

    <meta property="og:title" content="<?= $this->title ?>"/>
    <meta property="og:image" content="/logo_square.png"/>

    <script>dataLayer = [];</script>

    <?= $this->headers ?>

</head>
<body data-controller="<?= $CONTROLLER ?>"
      data-signed="<?= (\app\controller\UserSession::isSigned() == 1) ? 'true' : 'false' ?>"
      data-geo="<?= \app\component\Browser::getCurrentUserGeo() ?>" data-currency="<?= CURRENCY ?>">
<div class="opacity-layer"></div>

