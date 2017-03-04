$(function() {
  $('.no-drag').on('mousedown', function(e) {
    e.preventDefault();
  });

  $('.kmt-logo').on('mouseover touchend', function () {
    $(this).addClass('animated rotateIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeClass('animated rotateIn');
    });
  });

  $('.input-name').on('input', function () {
    $('.id-name').text($(this).val());
  });

  $('.input-url').on('input', function () {
    var url = 'https://images.weserv.nl/?url=' + $(this).val().replace(/^https?:\/\//,'');
    $('.id-image').css('background-image', 'url(' + url + ')');
  });

  $('.input-image').on('change', function (e) {
    $('.alert-success').show();
    if (this.files && this.files[0]) {
      var reader = new FileReader();
      $(reader).load(function (e) {
        $('.id-image').css('background-image', 'url(' + e.target.result + ')');
      });
      reader.readAsDataURL(this.files[0]);
    } else {
      $('.alert.image').show();
      console.error('Error occured while reading file');
    }
  });

  $('.btn-download').on('click', function () {
    domtoimage.toPng(document.querySelector('.id-wrapper'))
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = '中国国民党党证.png';
        link.href = dataUrl;
        link.click();
    });
  });
});
