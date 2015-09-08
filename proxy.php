<?

if( $_SERVER['SERVER_NAME'] === 'idmaker.osk2.me' || $_SERVER['SERVER_NAME'] === 'osk2.me' || $_SERVER['SERVER_NAME'] === 'www.osk2.me' || $_SERVER['SERVER_NAME'] === '127.0.0.1') {
	if ( filter_var($_GET['url'], FILTER_VALIDATE_URL) ) {
		$remoteImage = $_GET['url'];
		$imginfo = getimagesize($remoteImage);
		header("Content-type: ".$imginfo['mime']);
		readfile($remoteImage);
	}else{
		die('ERROR: URL INVALID.');
	}
}else{
	die('ERROR: ACCESS DENIED.');
}

?>