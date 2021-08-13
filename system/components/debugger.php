<?php

function debug($data, $name = false)
{
    if (defined('PRODUCTION') && !PRODUCTION) {
        echo "<b>Debugger: </b><i>$name</i>";
        if ($data){
            echo '<pre>' . print_r($data, TRUE) . '</pre>';
        } else {
            echo '<pre>NULL</pre>';
        }
    }
}

function console($data, $title = '')
{
    if (defined('PRODUCTION') && !PRODUCTION) {
        ChromePhp::group('%cPHP ' . $title, 'color: #1c9be5; font-weight: normal;');
        ChromePhp::log(empty($data) ? 'NULL' : $data);
        ChromePhp::groupEnd();
    }
}