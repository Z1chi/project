<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?=$this->title ?></title>

    <link rel="preload" href="/assets/js/bundle.js?<?=$MTIME_JS?>" as="script">
    <script src="/assets/js/bundle.js?<?=$MTIME_JS?>"></script>

    <link rel="shortcut icon" href="/img/icon.png" type="image/x-icon">
    <link rel="stylesheet" href="/css/fonts.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/css/magnific-popup.css?<?=$MTIME_CSS?>">
    <link rel="stylesheet" href="/css/jquery.formstyler.css?<?=$MTIME_CSS?>">
    <link rel="stylesheet" href="/css/jquery.formstyler.theme.css?<?=$MTIME_CSS?>">
    <link rel="stylesheet" href="/css/owl.carousel.css?<?=$MTIME_CSS?>">
    <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <link rel="stylesheet" href="/css/style.css?<?=$MTIME_CSS?>">

    <meta property="og:title" content="<?=$this->title ?>" />
    <meta property="og:image" content="/logo_square.png" />

    <script>dataLayer = [];</script>

    <?= $this->headers ?>

</head>
<body class="body-<?=$LANGUAGE?>" data-controller="<?=$CONTROLLER?>" data-language="<?=$LANGUAGE?>" data-signed="<?=(\app\controller\UserSession::isSigned()==1)?'true':'false'?>" data-geo="<?=\app\component\Browser::getCurrentUserGeo()?>" data-currency="<?=CURRENCY?>">
<a href="javascript:void(0)" class="arrow-white">
    <img src="/img/arrow-white.png" alt="">
</a>
