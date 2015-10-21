<?php
	header('Content-Type: application/json; charset=utf-8');
	if (isset($_GET['url']) && !empty($_GET['url'])) {
		$url = $_GET['url'];
		
		if(@getimagesize($url) !== false) {
			echo json_encode(array('result' => 'ok'));
		}else{
			echo json_encode(array('result' => 'fail'));
		}
	} else {
		echo json_encode(array('result' => 'fail'));
	}
?>