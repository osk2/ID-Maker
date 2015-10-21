$('.no-drag').on('mousedown', function() {
	return false;
});

$('#input_url').on('keydown', function() {
	$('#group_url').removeClass('error');
	$('#group_name').removeClass('error');
});

var print_ID = function() {
	$('.alert-success').show();
	$('.alert-error').hide();

	var len = 0,
		char_count,
		i = 0,
		input_name = $('#input_name').val();

	for(i = 0; i < input_name.length; i++) { 
		if (input_name[i].match(/[^\x00-\xff]/ig) !== null){
			len += 2;
		}else{
			len += 1;
		}
	}
	switch (len){
		case 1:
			char_count = 40;
			break;
		case 2:
			char_count = 38;
			break;
		case 3:
			char_count = 35;
			break;
		case 4:
			char_count = 33;
			break;
		case 5:
			char_count = 30;
			break;
		case 6:
			char_count = 27;
			break;
		case 7:
			char_count = 24;
			break;
		case 8:
			char_count = 21;
			break;
	}
	var url = $('#input_url').val();

	$.ajax({
		url: './url_validation.php?url=' + url,
		type: 'GET',
		dataType: 'JSON',
		success: function(data) {
			if( data.result === 'ok') {
				$('.alert-error').hide();
				if( $('#input_name').val() !== '') {
					url = 'proxy.php?url=' + url;
					$('#profile_img').attr('src', url).show();
					$('#profile_img').one('load', function() {
						var pos = $('#base_img').position(),
							name_y = pos.top + 143,
							name_x = pos.left + char_count;

						$('#profile_name').css('top', name_y + 'px');
						$('#profile_name').css('left', name_x + 'px');
						$('#profile_name_text').html( $('#input_name').val() );
						if(this.complete) {
							$('.alert-success').hide();
							gen_img();
							$('#gen_link').show();
						}
					});
					
				}else{
					$('#group_name').addClass('error');
				}
			}else{
				$('.alert-success').hide();
				$('.alert-error').show();
				$('#group_url').addClass('error');
				$('#input_url').on('keydown', function() {
					$('.alert-error').hide(200);
				});
			}
		}
	});

}

var gen_img = function() {
	html2canvas($('#kmt_id'), {
		onrendered: function(canvas) {
			var data_string = canvas.toDataURL('image/png');
			$('#gen_link > a').attr('href', data_string);
			$('#gen_link > a').attr('download', '中国国民党党证.png');
		}
	});
}