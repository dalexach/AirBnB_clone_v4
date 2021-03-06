const AmeId = {};
const notFound = ['<h2>', 'No places founded :(', '</h2>'];

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

function dataPrint(data) {
  $('<h1>Places</h1>').appendTo($('.places'));
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
   }
}

function chargePlaces(){
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({ amenities: Object.values(AmeId) }),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      if (data.length > 0){
        console.log(data);
        dataPrint(data);
      } else {
        $(notFound.join('')).appendTo($('.places'));
      }
    },
    error: function (data){
      console.log(data);
    }
  });
}

function allPlaces() {
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      console.log(data);
      dataPrint(data);
    },
    error: function (data){
      console.log(data);
    }
  });
}


function searchButton() {
  $('button').click(
    function () {
      $('.places').empty();
      chargePlaces();
    }
  );
}


$(document).ready(function () {
  /* const AmeId = {}; */

  checkStatus();
  checkAm();
  allPlaces();
  searchButton();
});
