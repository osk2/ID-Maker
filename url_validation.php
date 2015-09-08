<?
if (isset($_GET['url'])) {

	$url = $_GET['url'];
	
	if(getimagesize($url) !== false) {
		echo json_encode(array('result' => 'ok'));
	}else{
		echo json_encode(array('result' => 'fail'));
	}
	
}
?>