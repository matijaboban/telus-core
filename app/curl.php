<?php

require_once __DIR__ . '/app.php';

use \Curl\Curl;


class CurlCall
{
    /**
    * Class construct
    *
    * @author Matija Boban <code@matijaboban.com>
    * @version 0.0.1
    */
    public function __construct()
    {
        $this::isCurlClassIncluded();
    }

    /**
    * Get File
    *
    * @author Matija Boban <code@matijaboban.com>
    * @version 0.0.1
    */
    public function getFile(string $url, string $path)
    {
        $curl = new Curl();
        $curl->download($url, $path);
        $curl->close();
    }

    /**
    * check if cUrl lib is available
    *
    * @author Matija Boban <code@matijaboban.com>
    * @version 0.0.1
    */
    private static function isCurlClassIncluded()
    {
        if (!class_exists('\Curl\Curl')) {
            throw new Exception('cURL not available. cURL is required for full functionality of this class.');
        }
    }
}




(new CurlCall)->getFile(
    'https://upload.wikimedia.org/wikipedia/commons/2/23/Lake_mapourika_NZ.jpeg',
    AppPathsReal['storage'].'image.jpeg'
    );
