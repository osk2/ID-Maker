$('.no-drag').on('mousedown', function(e) {
	e.preventDefault();
});

$(function(){
	$('.label').tooltip();

	$('.gen').on('click', function() {
		$('.navbar-collapse li').removeClass('active').eq(1).addClass('active');
		$.get('gen.html',function(data){
			$(".content").hide().html(data).show('fast');
		});
	})
});