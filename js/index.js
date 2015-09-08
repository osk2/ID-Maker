$('.drag_dis').on('mousedown', function() {
	return false;
});

$(function(){
	$('.label').tooltip();

	$('.gen').on('click', function() {
		$('#make').addClass('active');
		$('#home').removeClass('active');
		$.get('gen.html',function(data){
			$("#content").hide().html(data).show('fast');
		});
	})
});