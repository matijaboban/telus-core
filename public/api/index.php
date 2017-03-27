<?php


require_once dirname( dirname(__DIR__) ) . '/app/app.php';


$klein = new \Klein\Klein();

$klein->respond(function ($request, $response) {
    var_dump($request->server());
});

$klein->dispatch();
