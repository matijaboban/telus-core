<?php

require_once dirname(__DIR__) . '/vendor/autoload.php';

define('AppPathsReal', array(
    'base'      => realpath(__DIR__.'/../'),
    'public'    => realpath(__DIR__.'/../public').'/',
    'storage'   => realpath(__DIR__.'/../storage').'/',
));



// var_dump(AppPathsReal);
// new CurlCall;
