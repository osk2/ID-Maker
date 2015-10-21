$(function(){
	$(document).on('mousedown', '.no-drag', function(e) {
		e.preventDefault();
	});

	$(document).on('mouseover touchend', '.kmt-logo', function () {
		$(this).addClass('animated rotateIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated rotateIn');
		});
	});

	$('.navbar-collapse a:not(.not-loader)').on('click', function (e) {
		var link = $(this).attr('href');

		$('.navbar-collapse li').removeClass('active');
		$(this).parent().addClass('active');
		$.get(link, function(data) {
			$('.content').hide().html(data).show('fast');
		});
		e.preventDefault();
	});

	$('.btn.gen').on('click', function () {
		$('.navbar-collapse .gen').trigger('click');
	});

	$(document).on('keydown', '#input_url', function() {
		$('.form-group').removeClass('has-error');
	});

	$(document).on('click', '.print-id-btn', function (e) {
		print_ID();
		e.preventDefault();
	});

	$(document).on('change', '#input_file', function (e) {
		$('.alert-success').show();
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			$(reader).load(function (e) {
				$('.alert-success').hide();
				$('#profile_img').attr('src', e.target.result);
			});
			reader.readAsDataURL(this.files[0]);
		}
	})
});

var print_ID = function() {
	$('.alert-danger').hide();

	var len = 0,
		i = 0,
		char_count,
		input_name = $('#input_name').val(),
		has_image = false,
		image_source = '';

	if (input_name === '') {
		$('.form-group.name').addClass('has-error');
		$('.alert-danger.name').show();
		$('.form-control').one('keydown', function() {
			$('.alert-danger').hide(200);
			$('.form-group').removeClass('has-error');
		});
		return false;
	}

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
	if (url !== '') {
		has_image = true;
		image_source = 'url';
	}

	if ($('#input_file').val() !== '') {
		has_image = true;
		image_source = 'input';
	}

	if (!has_image) {
		$('.alert-danger.image').show();
		$('.form-group.url, .form-group.file').addClass('has-error');
		$('.form-control').one('keydown change', function() {
			$('.alert-danger').hide(200);
			$('.form-group').removeClass('has-error');
		});
		return false;
	}

	switch (image_source) {
	case 'input':
		var pos = $('#base_img').position(),
			name_y = pos.top + 144,
			name_x = pos.left + char_count;

		$('#profile_name').css('top', name_y + 'px');
		$('#profile_name').css('left', name_x + 'px');
		$('#profile_name_text').html(input_name);
		$('.alert-success').hide();
		$('#kmt_id').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$(this).removeClass('animated bounceIn');
			gen_img();
			$('#gen_link').show();
		});
		break;

	case 'url':

		var valid_url = false;
		$.ajax({
			url: './url_validation.php?url=' + url,
			type: 'GET',
			dataType: 'JSON',
			beforeSend: function () {
				$('.alert-success').show();
			},
			success: function (data) {
				if(data.result === 'ok') {
					valid_url = true;
					$('.alert-danger').hide();
					url = 'proxy.php?url=' + url;
					$('#profile_img').attr('src', url).show();
					$('#profile_img').one('load', function() {
						var pos = $('#base_img').position(),
							name_y = pos.top + 144,
							name_x = pos.left + char_count;

						$('#profile_name').css('top', name_y + 'px');
						$('#profile_name').css('left', name_x + 'px');
						$('#profile_name_text').html(input_name);
						if(this.complete) {
							$('.alert-success').hide();
							$('#kmt_id').addClass('animated bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
								$(this).removeClass('animated bounceIn');
								gen_img();
								$('#gen_link').show();
							});
						}
					});
				} else {
					$('.alert-success').hide();
					$('.alert-danger.url-error').show();
					$('.form-group.url').addClass('has-error');
					$('.form-control').one('keydown', function() {
						$('.alert-danger').hide(200);
						$('.form-group').removeClass('has-error');
					});
					return false;
				}
			}
		});
		break;

	default:
		break;
	}
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