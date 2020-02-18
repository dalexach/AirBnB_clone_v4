$(document).ready(function () {
  const AmeId = {};

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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      for (const obtData in data) {
        const place = data[obtData];
        const struct = [
          '<article>',
          '<div class="title">',
          '<h2>',
          place.name,
          '</h2>',
          '<div class="price_by_night">',
          place.price_by_night,
          '</div>',
          '</div>',
          '<div class="information">',
          '<div class="max_guest">',
          '<i class="fa fa-users fa-3x" aria-hidden="true">',
          '</i>',
          '<br />',
          place.max_guest,
          ' Guests',
          '</div>',
          '<div class="number_rooms">',
          '<i class="fa fa-bed fa-3x" aria-hidden="true">',
          '</i>',
          '<br />',
          place.number_rooms,
          ' Bedrooms',
          '</div>',
          '<div class="number_bathrooms">',
          '<i class="fa fa-bath fa-3x" aria-hidden="true">',
          '</i>',
          '<br />',
          place.number_bathrooms,
          ' Bathroom',
          '</div>',
          '</div>',
          '<div class="description">',
          place.description,
          '</div>',
          '</article>'
        ];
        $(struct.join('')).appendTo($('.places'));
      }}
  });
});
