<?php
$ch = curl_init();
$timeout = 30;
$userAgent = $_SERVER['HTTP_USER_AGENT'];

if (getenv(HTTP_X_FORWARDED_FOR)) {
        $ip_address = getenv(HTTP_X_FORWARDED_FOR);
    } else {
        $ip_address = getenv(REMOTE_ADDR);
    }

$myFile = "URL_searches.txt";
$fh = fopen($myFile, 'a') or die("");
$stringData = date("F j, Y, g:ia")."\t".$ip_address."\t".$_REQUEST['url']."\n";
fwrite($fh, $stringData);
fclose($fh);


curl_setopt($ch, CURLOPT_URL, $_REQUEST['url']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);

$response = curl_exec($ch);     

if (curl_errno($ch)) {
    echo curl_error($ch);
} else {
    curl_close($ch);
    echo $response;
}



?>
