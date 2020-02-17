function check () {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.success === 'OK'){
        $.('DIV#api_status').toggleClass('available');
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}


$(document).ready(function () {
  const AmeId = {};
  
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.success === 'OK'){
        $.('DIV#api_status').toggleClass('available');
      }
    },
    error: function (data) {
      console.log(data);
    }
  });

  $('input[type=ckeckbox]').click(function () {
    if ($(this).is(':ckecked')) {
      AmeId[$(this).data('name')] = $(this).data('id');
    } else {
      delete AmeId[$(this).data('name')];
    }
    const TagH4 = $(this).closest('.amenities').find('h4');
    const lista = Object.keys(AmeId);
    if (lista.length > 0) {
      TagH4.text(lista);
    } else {
      TagH4.text('');
    }
  });
});
