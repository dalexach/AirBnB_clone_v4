const AmeId = {};

function checkAm() {
  const allAmen = $('.amenities INPUT');
  allAmen.each(function () {
    $(this).change(function () {
      if ($(this).prop('checked')) { 
        AmeId[$(this).data('name')] = $(this).data('id');
      } else {
          delete AmeId[$(this).data('name')];
      }
      const TagH4 = $(this).closest('.amenities').find('h4');
      const lista = Object.keys(AmeId);
      if (lista.length > 0) {
        TagH4.text(lista);
        console.log(lista);
       } else {
          TagH4.text(' ');
       }
     });
  });
};

function checkStatus() {

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    },
    error: function (data) {
      /** console.log(data); */
      $('DIV#api_status').removeClass('available');
    }
  });
}


$(document).ready(function () {
  checkAm();
  checkStatus();
});
